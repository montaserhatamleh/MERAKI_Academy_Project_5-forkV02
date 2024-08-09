import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ padding: '.5rem', borderTop: '1px solid #555', backgroundColor: '#333' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>Company</Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, color: '#ddd' }}>Home</Link>
            <Link href="/about" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, color: '#ddd' }}>About Us</Link>
            <Link href="/services" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, color: '#ddd' }}>Services</Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ color: '#ddd' }}>Contact</Link>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>Support</Typography>
            <Link href="/faq" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, color: '#ddd' }}>FAQ</Link>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, color: '#ddd' }}>Privacy Policy</Link>
            <Link href="/terms" color="inherit" underline="hover" sx={{ color: '#ddd' }}>Terms of Service</Link>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ddd' }}>285 Amman, Jordan, State, 56789</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ddd' }}>Email: contact@feedme.com</Typography>
            <Typography variant="body2" sx={{ color: '#ddd' }}>Phone: (962) 456-7890</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3, backgroundColor: '#555' }} />
        <Typography variant="body2" align="center" sx={{ color: '#bbb' }}>
          © {new Date().getFullYear()} FeedMe. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
};

export default Footer;
