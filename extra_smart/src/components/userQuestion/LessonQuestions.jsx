import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
  } from "@mui/material";
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import { useState, useEffect } from "react";
  import api from "../../api";
  
  export default function LessonQuestions({ lessonId }) {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
  
    useEffect(() => {
      if (!lessonId) return;
      const fetchQuestions = async () => {
        try {
          const { data } = await api.get(`/en/courses/lessons/${lessonId}/questions/`);
          setQuestions(data);
        } catch (error) {
          console.error("Failed to fetch questions", error);
        }
      };
      fetchQuestions();
    }, [lessonId]);
  
    const handleSubmit = async () => {
      if (!newQuestion.trim()) return;
      try {
        const res = await api.post(`/en/courses/lessons/${lessonId}/questions/`, {
            question_text: newQuestion,
        });
        setQuestions([res.data, ...questions]);
        setNewQuestion("");
        } catch (error) {
            console.error("POST Error:", error.response?.data); 
        }
    };
  
    return (
      <Card
        elevation={3}
        sx={{
          px: 4,
          py: 5,
          maxWidth: "100%",
          mt: 5,
          borderRadius: 3,
          
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💬 هل لديك سؤال حول هذا الدرس؟
        </Typography>
  
        <Box component="form" noValidate autoComplete="off" width="100%" mt={3}>
          <Stack direction="column" spacing={2}>
            <TextField
              label="اكتب سؤالك هنا..."
              placeholder="مثال: لم أفهم الجزء الخاص بـ..."
              multiline
              rows={4}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ alignSelf: "flex-start", px: 4 }}
            >
              إرسال السؤال
            </Button>
          </Stack>
        </Box>
  
        <Divider sx={{ my: 4 }} />
  
        <Typography variant="h6" fontWeight="medium" mb={2}>
          الأسئلة المطروحة:
        </Typography>
  
        {questions.length === 0 ? (
          <Typography color="text.secondary">لا توجد أسئلة بعد</Typography>
        ) : (
          questions.map((q) => (
            <Accordion key={q.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box>
                  <Typography fontWeight="bold">{q.user_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {q.question_text}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {q.answer ? (
                  <Card variant="outlined" sx={{  }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        رد المحاضر ({q.answer.user_name})
                      </Typography>
                      <Typography>{q.answer.answer_text}</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography color="text.secondary">
                    لم يتم الرد بعد على هذا السؤال.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Card>
    );
  }
  