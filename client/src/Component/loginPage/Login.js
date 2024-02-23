// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Card from '@mui/material/Card'; // Import Card component
// import CardContent from '@mui/material/CardContent'; // Import CardContent component
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HeaderSignIn from './HeaderSignIn';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from "axios";

// // const defaultTheme = createTheme();

// const customTheme = createTheme({
//   palette: {
//     background: {
//       default: '#c3ddd9',
//     },
//   },
// });

// export default function Login() {

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     EmployeeID:"",
//     Password:"",
//   });


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:3306/api/userDetails/login",
//         {
//           EmployeeID: formData.EmployeeID,
//           Password: formData.Password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         },
//       );

//       const data = response.data;
//       console.log(data, "datat");
//       if (response.status === 400 || !data) {
//         console.log("not open");
//       } else {
//         console.log("login successful");
//         // Store user data in sessionStorage
//         sessionStorage.setItem("userData", JSON.stringify(data.user));
//         // Use navigate to navigate based on user role
//         localStorage.clear();
//         localStorage.setItem("token", JSON.stringify(data.token));
        
//           navigate("/"); 
       
//       }
//     } catch (error) {
//       setError("Invalid Employee ID or Password");
//       console.error(error);
//       alert("Invalid Employee ID or Password");
//       window.location.reload(false);
//     }
//   };


//   return (
//     <ThemeProvider theme={customTheme} >
//       <HeaderSignIn />
//       <Container component="main" maxWidth="xs" >
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Card>
//             <CardContent> {/* Wrap content inside CardContent */}
//             <span style={{ display: "flex", justifyContent: "center" }}>
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                   <LockOutlinedIcon />
//                 </Avatar>
//               </span>
//               <Typography
//                 style={{ display: "flex", justifyContent: "center" }}
//                 component="h1"
//                 variant="h5"
//               >
//                 Sign in
//               </Typography>
//               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="EmployeeID"
//                   label="EmployeeID"
//                   name="EmployeeID"
//                   autoComplete="EmployeeID"
//                   value={formData.EmployeeID}
//                   onChange={handleInputChange}
//                   autoFocus
//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="Password"
//                   label="password"
//                   type="Password"
//                   id="password"
//                   autoComplete="current-password"
//                   value={formData.Password}
//                   onChange={handleInputChange}
//                 />
//                 <FormControlLabel
//                   control={<Checkbox value="remember" color="primary" />}
//                   label="Remember me"
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Sign In
//                 </Button>

//                 <Grid container>
//                   <Grid item xs>
//                     <Link href="#" variant="body2">
//                       Forgot password?
//                     </Link>
//                   </Grid>
                 
//                 </Grid>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }




import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderSignIn from './HeaderSignIn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

const customTheme = createTheme({
  palette: {
    background: {
      default: '#c3ddd9',
    },
  },
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    EmployeeID: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3306/api/userDetails/login",
        {
          EmployeeID: formData.EmployeeID,
          Password: formData.Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const data = response.data;
      if (response.status === 200 && data.user) {
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      } else {
        setError("Invalid Employee ID or Password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderSignIn />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card>
            <CardContent>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </span>
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                component="h1"
                variant="h5"
              >
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="EmployeeID"
                  label="EmployeeID"
                  name="EmployeeID"
                  autoComplete="EmployeeID"
                  value={formData.EmployeeID}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.Password}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                {error && (
                  <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
