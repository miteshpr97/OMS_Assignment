const cron = require("node-cron");
const { queryAsync } = require("../db");

async function scheduleDueUpdation() {
  cron.schedule("0 8 * * *", async () => {
    await updateDueForAssignments();
  });
  cron.schedule("0 17 * * *", async () => {
    await updateDueForAssignments();
  });
}

async function updateDueForAssignments() {
  try {
    const results = await queryAsync("SELECT * FROM tb_assignment");

    for (const assignment of results) {
      const due = calculateDaysLeft(assignment);
      const updateQuery = `
                  UPDATE tb_assignment 
                  SET Due = ? 
                  WHERE 
                    AssignmentID = ? 
                    AND EmployeeID = ? 
                    AND EmployeeID_AssignTo = ?;
`;

      await queryAsync(updateQuery, [
        due,
        assignment.AssignmentID,
        assignment.EmployeeID,
        assignment.EmployeeID_AssignTo,
      ]);
      console.log(`Due updated for AssignmentID ${assignment.AssignmentID}`);
    }

    console.log("Due for all assignments updated.");
  } catch (error) {
    console.error("Error updating due for assignments:", error);
  }
}

function calculateDaysLeft(assignment) {
  const assignDate = new Date(assignment.AssignDate);
  const deadlineDate = new Date(assignment.DeadlineDate);
  const now = new Date();

  // Function to calculate the difference in days between two dates
  function calculateDateDifference(date1, date2) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((date1 - date2) / millisecondsPerDay);
  }

  if (assignment.AssignmentStatus === "Assigned") {
    return calculateDateDifference(deadlineDate, assignDate);
  }

  // Check if the assignment is still in progress
  if (assignment.AssignmentStatus === "Progress") {
    return calculateDateDifference(deadlineDate, now);
  }

  // Calculate days before or after deadlineDate when status is changed
  if (assignment.AssignmentStatus === "Regret" && assignment.RegretTimeStamp) {
    const regretDate = new Date(assignment.RegretTimeStamp);
    return calculateDateDifference(regretDate, assignDate);
  } else if (
    assignment.AssignmentStatus === "Reject" &&
    assignment.RejectTimeStamp
  ) {
    const rejectDate = new Date(assignment.RejectTimeStamp);
    return calculateDateDifference(rejectDate, assignDate);
  } else if (
    assignment.AssignmentStatus === "Closed" &&
    assignment.CompletionTimestamp
  ) {
    const completionDate = new Date(assignment.CompletionTimestamp);
    return calculateDateDifference(deadlineDate, completionDate);
  }

  // Default case when none of the above conditions are met
  return 0;
}

module.exports = { scheduleDueUpdation };
