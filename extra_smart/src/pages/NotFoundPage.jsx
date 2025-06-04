import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{ mt: 3 }}>
        Back to Home Page
      </Button>
    </Container>
  );
}