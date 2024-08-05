import React from 'react'
import {Accordion , AccordionSummary , AccordionDetails, Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const privacyData = [
    {
        question: "What personal information does FeedMe collect?",
        answer: "FeedMe collects Personally Identifiable Information (PII) such as first name, last name, street address, area and city, phone numbers, e-mail address, and GPS location (on the mobile site). Additionally, FeedMe may collect information about past orders, favorite restaurants, customer service inquiries, reviews, and social networking preferences."
    },
    {
        question: "What is Non-Personally Identifiable Information (Non-PII), and how is it used?",
        answer: "Non-PII includes aggregated information, demographic data, and other details that do not reveal specific identities. FeedMe and its third-party providers collect Non-PII such as MAC addresses, computer type, screen resolution, and demographic data. Non-PII can be used for any purpose and may be shared with affiliates and other third parties. If combined with PII, it will be treated as PII."
    },
    {
        question: "How does FeedMe use cookies, and how can I manage them?",
        answer: "FeedMe uses cookies to enhance user experience, such as remembering login information and preferences. You can manage cookies by adjusting browser settings. For more details, visit http://www.allaboutcookies.org/."
    },
    {
        question: "How does FeedMe use my email address?",
        answer: "Your email address is required to register an account and is used to confirm orders, communicate about order issues, and send updates. You can update or delete your email address through your account settings. If you choose not to provide an email, you won't be able to register or place orders."
    },
    {
        question: "How does FeedMe handle payment information?",
        answer: "FeedMe does not store debit/credit card information. Payments can be made at the door or online. Online transactions are encrypted and processed directly with the card company. Some card information may be kept encrypted for future reference."
    },
    {
        question: "How is my personal information shared and disclosed?",
        answer: "Personal information is shared with restaurants to process orders, and may be disclosed to third parties such as service providers, legal authorities, or in case of business transitions. It is also used for internal purposes and may be disclosed if required by law or for fraud protection."
    },
    {
        question: "How can I delete my FeedMe account?",
        answer: "You can delete your account through the FeedMe mobile app under 'Settings' > 'Account Info'. Ensure all pending transactions are completed before deletion. Some information may be retained to comply with legal obligations or for legitimate interests."
    },
    {
        question: "How does FeedMe protect my personal information?",
        answer: "FeedMe uses secure pages, SSL encryption, and various technical practices to protect your data. While no system is 100% secure, reasonable measures are taken to safeguard your information."
    }
];
const Privacy = () => {
    
    return ( <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, p: 3 }}>
      <Typography variant="h3" gutterBottom>
       Privacy
      </Typography>
       
        <Box sx={{ width: '100%', maxWidth: 600, margin: '40px auto' }}>
          {privacyData.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    maxHeight: 200, 
                    overflowY: 'auto',
                    pr: 2,
                    '&::-webkit-scrollbar': {
                      width: '0.4em',
                    },
                    '&::-webkit-scrollbar-track': {
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,.1)',
                      outline: '1px solid slategrey',
                    },
                  }}
                >
                  <Typography>
                    {item.answer}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        </Box>

        </>
      );
    };


export default Privacy