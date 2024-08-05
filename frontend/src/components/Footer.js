import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#044a7e', color: 'white', padding: '40px 0', borderTop: '1px solid #333' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Company</Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>Home</Link>
            <Link href="/about" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>About Us</Link>
            <Link href="/services" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>Services</Link>
            <Link href="/contact" color="inherit" underline="hover">Contact</Link>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Support</Typography>
            <Link href="/faq" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>FAQ</Link>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>Privacy Policy</Link>
            <Link href="/terms" color="inherit" underline="hover">Terms of Service</Link>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>1234 Street Name, City, State, 56789</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Email: contact@company.com</Typography>
            <Typography variant="body2">Phone: (123) 456-7890</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3, backgroundColor: '#333' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
