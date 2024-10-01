import { useEffect, useState } from 'react'
import './App.css'
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

function App() {
  const [componentName, setComponentName] = useState('');
  const [useStateRequired, setUseStateRequired] = useState(false);
  const [useEffectRequired, setUseEffectRequired] = useState(false);
  const [pseudocode, setPseudocode] = useState('');
  const [apiCallType, setApiCallType] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePseudocode = () => {
    let apiCallCode = '';

    // Generate pseudocode for different API calls based on the selection
    if (apiCallType === 'GET') {
      apiCallCode = `
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('${apiUrl}');
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);`;
    } else if (apiCallType === 'POST') {
      apiCallCode = `
      const handleSubmit = async (formData) => {
        try {
          const response = await axios.post('${apiUrl}', formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };`;
    } else if (apiCallType === 'PUT') {
      apiCallCode = `
      const handleUpdate = async (id, updateData) => {
        try {
          const response = await axios.put(\`\${${apiUrl}}/\${id}\`, updateData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };`;
    } else if (apiCallType === 'DELETE') {
      apiCallCode = `
      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(\`\${${apiUrl}}/\${id}\`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };`;
    }

    let code = `
1. Import necessary modules and dependencies
    - Import React from 'react'
    - Import axios from 'axios'
    - Import any other required components, libraries, or assets

2. Define a functional component
    - Name the component (e.g., ${componentName})

3. Declare state variables (if needed)
    ${useStateRequired ? '- Use the useState hook to manage state within the component' : ''}

4. Define any necessary functions or event handlers
    ${apiCallCode ? '- This will handle the API calls and response' : ''}

5. Use the useEffect hook (if needed)
    ${useEffectRequired || apiCallType === 'GET' ? '- Handle side effects such as fetching data when the component mounts\n    ' + apiCallCode : ''}

6. Return the JSX for rendering the UI
    - Structure the UI layout using HTML-like JSX syntax
    - Use conditional rendering if needed
    - Map over arrays to render lists
    - Apply styles and pass props to child components

7. Export the component
    - Use export default to make the component available for import in other files
    `;

    setPseudocode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pseudocode)
      .then(() => {
        setCopySuccess(true);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000)
    }
  }, [copySuccess])

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        React Pseudocode Generator
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Component Name"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          variant="outlined"
        />
        <FormGroup>
          <FormControlLabel
            label={useStateRequired ? 'Remove useState' : 'Add useState'}
            control={
              <Checkbox
                id='useState'
                checked={useStateRequired}
                onChange={(e) => setUseStateRequired(e.target.checked)}
              />
            }
          />
          <FormControlLabel
            label={useEffectRequired ? 'Remove useEffect' : 'Add useEffect'}
            control={
              <Checkbox
                id='useEffect'
                checked={useEffectRequired}
                onChange={(e) => setUseEffectRequired(e.target.checked)}
              />
            }
          />
        </FormGroup>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="type">API Call Type</InputLabel>
          <Select
            id='type'
            name='type'
            value={apiCallType}
            onChange={(e) => setApiCallType(e.target.value)}
            label="API Call Type"
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
          </Select>
        </FormControl>

        {apiCallType && (
          <TextField
            label="API URL"
            name='url'
            id='url'
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            variant="outlined"
            fullWidth
          />
        )}
        <Box sx={{ display: 'flex' }}>
          <Button disableRipple sx={{ backgroundColor: '#1a1a1a' }} variant="contained" onClick={generatePseudocode}>
            Generate Pseudocode
          </Button>
          <Button
            disableRipple
            sx={{ marginLeft: '10px', backgroundColor: 'red' }}
            variant="contained"
            onClick={() => {
              setPseudocode('');
              setComponentName('');
              setUseStateRequired(false);
              setUseEffectRequired(false);
              setApiCallType('');
            }}
          >
            Clear
          </Button>
        </Box>

        {pseudocode && (
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="h2">
                Generated Pseudocode
              </Typography>
              {!copySuccess ? (
                <IconButton
                  disableRipple
                  onClick={copyToClipboard}
                >
                  <ContentCopyIcon
                    sx={{ cursor: 'pointer', fontSize: '18px' }}
                  />
                </IconButton>
              ) : (
                <IconButton>
                  <LibraryAddCheckIcon
                    sx={{ cursor: 'pointer', fontSize: '18px' }}
                  />
                </IconButton>
              )}
            </Box>
            <pre>
              {/* <code> */}
              {pseudocode}
              {/* </code> */}
            </pre>
          </Box>
        )}
      </Box>
    </Container >
  )
}

export default App
