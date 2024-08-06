import React from 'react'
import {Accordion , AccordionSummary , AccordionDetails, Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const termsData = [
    {
        question: "What are the Terms and Conditions for using FeedMe?",
        answer: "By using FeedMe's Platform (including associated applications on mobile devices), you agree to our Terms and Conditions, which include our Privacy Policy. These Terms constitute a legal contract between you and FeedMe. You should review these Terms before placing any orders."
    },
    {
        question: "What should I do if I disagree with the Terms and Conditions?",
        answer: "If you do not agree with our Terms and Conditions, you should not use the Platform. Your continued use signifies acceptance of any changes made to these Terms."
    },
    {
        question: "How does FeedMe facilitate orders from Merchants?",
        answer: "FeedMe provides a service that connects users with local Merchants for ordering goods. We act as an intermediary, managing the order process, but we do not control the production or quality of the goods offered by Merchants."
    },
    {
        question: "Does FeedMe verify the Merchants' credentials and product quality?",
        answer: "No, FeedMe does not independently verify the credentials or product quality of Merchants. Users are encouraged to review information provided by Merchants and ensure it meets their requirements before placing an order."
    },
    {
        question: "Can I cancel an order once it has been accepted by a Merchant?",
        answer: "You can cancel an order for a full refund before it is accepted by the Merchant. After acceptance, cancellations must be requested through our Platform, and refunds may not be guaranteed."
    },
    {
        question: "How are delivery times estimated and what factors affect them?",
        answer: "Delivery times are estimated based on various factors such as order quantity, distance, and traffic conditions. These times are not guaranteed and may vary. You can track the estimated delivery time on the Platform."
    },
    {
        question: "What happens if my order is not delivered successfully?",
        answer: "If delivery fails due to issues like being uncontactable or insufficient access, FeedMe reserves the right to cancel the order without a refund. We will attempt to inform you and provide next steps."
    },
    {
        question: "How should I handle issues with my order such as wrong items or defects?",
        answer: "If you receive a wrong, defective, or incomplete order, contact customer support immediately through our in-app chat. We may request additional information to investigate the issue and will provide compensation if warranted."
    },
    {
        question: "Is contactless delivery available?",
        answer: "Yes, contactless delivery is available for certain items. However, FeedMe is not liable for any issues that occur after the delivery has taken place, such as theft or damage."
    },
    {
        question: "What responsibilities do I have regarding my account and password?",
        answer: "You are responsible for maintaining the confidentiality of your account username and password. FeedMe is not liable for any issues arising from the misuse or unauthorized use of your account."
    },
    {
        question: "How can I delete my account?",
        answer: "To delete your account, contact us via the chat feature on the Platform and request account deletion."
    }
];
const Terms = () => {
    
    return ( <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'black' }}>
      Terms and Conditions
      </Typography>
       
        <Box sx={{ width: '100%', maxWidth: 600, margin: '40px auto' }}>
          {termsData.map((item, index) => (
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


export default Terms
