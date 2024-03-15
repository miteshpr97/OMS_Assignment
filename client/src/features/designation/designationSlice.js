// import { createSlice } from "@reduxjs/toolkit";
// import { fetchDesignationData, createDesignationData, deleteDesignationData, updateDesigantionData} from './designationAction';

// const initialState = {
//   designationData: [],
//   loading: false,
//   error: null
// };

// const designationSlice = createSlice({
//   name: "designation",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetching designation data
//       .addCase(fetchDesignationData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDesignationData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.designationData = action.payload;
//       })
//       .addCase(fetchDesignationData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Creating designation data
//       .addCase(createDesignationData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createDesignationData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.designationData.push(action.payload);
//       })
//       .addCase(createDesignationData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // Deleting designation data
//       .addCase(deleteDesignationData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteDesignationData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.designationData = state.designationData.filter(designation => designation.DesignationID !== action.payload.DesignationID);
//       })
//       .addCase(deleteDesignationData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       //update
//       .addCase(updateDesigantionData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateDesigantionData.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedDesigantion = action.payload;
//         state.designationData = state.designationData.map(designation => {
//           if (designation.DesignationID === updatedDesigantion.DesignationID) {
//             return { ...designation, ...updatedDesigantion };
//           }
//           return designation;
//         });
//       })
//       .addCase(updateDesigantionData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const selectdesignationData = (state) => state.designation.designationData;
// export const selectLoading = (state) => state.designation.loading;
// export const selectError = (state) => state.designation.error;

// export default designationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDesignationData,
  createDesignationData,
  deleteDesignationData,
  updateDesigantionData,
} from "./designationAction";

// Initial state
const initialState = {
  designationData: [],
  loading: false,
  error: null,
};

// Create a Redux slice
const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching designation data
      .addCase(fetchDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData = action.payload;
      })
      .addCase(fetchDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Creating designation data
      .addCase(createDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData.push(action.payload);
      })
      .addCase(createDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Deleting designation data
      .addCase(deleteDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData = state.designationData.filter(
          (designation) =>
            designation.DesignationID !== action.payload.DesignationID
        );
      })
      .addCase(deleteDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Updating designation data
      .addCase(updateDesigantionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDesigantionData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDesignation = action.payload;

        state.designationData = state.designationData.map((designation) => {
          if (designation.DesignationID === updatedDesignation.DesignationID) {
            return { ...designation, ...updatedDesignation };
          }
          return designation;
        });
      })
      .addCase(updateDesigantionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export selectors to access state
export const selectdesignationData = (state) =>
  state.designation.designationData;
export const selectLoading = (state) => state.designation.loading;
export const selectError = (state) => state.designation.error;

export default designationSlice.reducer;
