"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  Chip,
  AppBar,
  Toolbar,
  useTheme,
  Grid,
} from "@mui/material";

// MUI Icons
import ChatIcon from "@mui/icons-material/Chat";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function MainPage() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const theme = useTheme();

  const tools = [
    {
      id: "chatbot",
      name: "AI 챗봇",
      description: "똑똑한 AI 어시스턴트와 대화하세요",
      icon: ChatIcon,
      color: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      available: true,
    },
    {
      id: "coming-soon-1",
      name: "준비중",
      description: "곧 만나요",
      icon: AutoAwesomeIcon,
      color: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
      available: false,
    },
    {
      id: "coming-soon-2",
      name: "준비중",
      description: "곧 만나요",
      icon: AutoAwesomeIcon,
      color: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
      available: false,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #f8fafc, #eff6ff, #ecfeff)",
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <AutoAwesomeIcon sx={{ color: "white" }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Seok Dev Tools
              </Typography>
              <Typography variant="caption" color="text.secondary">
                유용한 도구 모음
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Welcome Section */}
        <Box mb={6}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            안녕하세요 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            필요한 도구를 선택해주세요
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isHovered = hoveredTool === tool.id;

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={tool.id}>
                <Card
                  elevation={isHovered && tool.available ? 8 : 1}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    transform:
                      isHovered && tool.available ? "translateY(-4px)" : "none",
                    opacity: tool.available ? 1 : 0.6,
                    border:
                      isHovered && tool.available
                        ? `1px solid ${theme.palette.primary.main}`
                        : "1px solid transparent",
                  }}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  <CardActionArea
                    disabled={!tool.available}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: tool.color,
                        transform:
                          isHovered && tool.available
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <Icon sx={{ color: "white", fontSize: 32 }} />
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {tool.name}
                        </Typography>
                        {tool.available && (
                          <ChevronRightIcon
                            sx={{
                              color: "text.secondary",
                              transform: isHovered ? "translateX(4px)" : "none",
                              transition: "transform 0.3s",
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {tool.description}
                      </Typography>
                    </Box>

                    {tool.available && (
                      <Box position="absolute" top={16} right={16}>
                        <Chip
                          label="사용 가능"
                          size="small"
                          color="success"
                          sx={{
                            bgcolor: "#dcfce7",
                            color: "#15803d",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer Info */}
        <Box
          mt={8}
          p={3}
          sx={{
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(4px)",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoAwesomeIcon color="primary" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              더 많은 기능이 추가될 예정입니다
            </Typography>
            <Typography variant="body2" color="text.secondary">
              지속적으로 새로운 도구들이 업데이트됩니다. 기대해주세요!
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
