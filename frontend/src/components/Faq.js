import React from 'react'
import {Accordion , AccordionSummary , AccordionDetails, Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const freqData =[
    { question: "What is FeedMe?", answer : "FeedMe is a leading online food delivery service that operates in Jordan    We seamlessly connect customers with their favorite restaurants. It takes just few taps from our platform to place an order through FeedMe from your favorite place."},
    {question: "What does FeedMe do?" , answer : "We simply take your submitted order and send it to the restaurant through a completely automated process, so you don’t have to deal with all the hassle of ordering and we make sure that you receive your order on time, every-time!"},
{question: "How much will it cost me to use FeedMe services?", answer : "The only extra charges that might be applied are the restaurant’s delivery fees."},

{question: "How do I place an order on FeedMe?", answer : "Go to FeedMe app, log in with your account, then place an order from your favorite restaurant."},

{question: "If I placed an order, how long does it take to receive the order?", answer : "It depends on the restaurant's estimated delivery time. Each restaurant will display its order delivery time in the restaurant's Info section. However, the time may vary depending on the road traffic congestion."},
{question: "Can I rate or write a review about my recent order?", answer : "Yes. You can rate and write a review about your previous order. You can simply go to My Orders tab on my account page and click on a particular order to rate/review."},
{question: "How can I contact FeedMe.com?", answer : "You can contact us anytime through live chat or call us our hotline number (we operate 24 hours) or send your feedback through the Feedback tab."}

]
const Faq = () => {
    
    return ( <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'black' }} >
        Frequently Asked Questions (FAQ)
      </Typography>
       
        <Box sx={{ width: '100%', maxWidth: 600, margin: '40px auto' }}>
          {freqData.map((item, index) => (
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


export default Faq