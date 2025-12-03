"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
// MUI Icons
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // Bot
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Sparkles
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DRAWER_WIDTH = 320;

export default function ChatbotUI() {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "안녕하세요! 무엇을 도와드릴까요? 😊",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "죄송합니다. 아직 AI 기능이 연결되지 않았습니다. 여기에 실제 챗봇 로직을 연결하시면 됩니다!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f8fafc" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid #e2e8f0",
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid #e2e8f0" }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: "transparent",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              <AutoAwesomeIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                AI 챗봇
              </Typography>
              <Typography variant="caption" color="text.secondary">
                항상 도와드립니다
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              py: 1.5,
            }}
          >
            새 대화 시작
          </Button>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
            sx={{ px: 2, mb: 1, display: "block" }}
          >
            최근 대화
          </Typography>
          <List>
            {[1, 2, 3].map((i) => (
              <ListItemButton
                key={i}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SmartToyIcon fontSize="small" color="primary" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={`대화 #${i}`}
                  secondary={i === 1 ? "방금 전" : `${i}시간 전`}
                  primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid #e2e8f0" }}>
          <Button
            fullWidth
            startIcon={<HomeIcon />}
            color="inherit"
            sx={{ justifyContent: "flex-start" }}
          >
            메인으로 돌아가기
          </Button>
        </Box>
      </Drawer>

      {/* Main Chat Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "white",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              variant="rounded"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              <SmartToyIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                AI 어시스턴트
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#22c55e",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  온라인
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  flexDirection: isUser ? "row-reverse" : "row",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: isUser ? "grey.700" : "transparent",
                    background: !isUser
                      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : undefined,
                  }}
                >
                  {isUser ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    maxWidth: "60%",
                    bgcolor: isUser ? "primary.main" : "white",
                    color: isUser ? "white" : "text.primary",
                    border: isUser ? "none" : "1px solid #e2e8f0",
                    background: isUser
                      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : undefined,
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      color: isUser
                        ? "rgba(255,255,255,0.7)"
                        : "text.secondary",
                      textAlign: "right",
                    }}
                  >
                    {message.timestamp.toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
          {isTyping && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                <SmartToyIcon />
              </Avatar>
              <Paper sx={{ p: 2, border: "1px solid #e2e8f0" }} elevation={0}>
                <Typography variant="body2" color="text.secondary">
                  AI가 입력 중...
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 3, bgcolor: "white", borderTop: "1px solid #e2e8f0" }}>
          <Stack maxWidth="md" mx="auto" spacing={1}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="메시지를 입력하세요..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                endIcon={<SendIcon />}
                sx={{
                  px: 3,
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                전송
              </Button>
            </Stack>
            <Typography variant="caption" color="text.disabled" align="center">
              AI가 생성한 답변은 부정확할 수 있습니다. 중요한 정보는
              확인해주세요.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
