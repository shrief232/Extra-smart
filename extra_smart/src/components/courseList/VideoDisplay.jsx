import { useEffect, useRef, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import Replay10 from '@mui/icons-material/Replay10';
import Forward10 from '@mui/icons-material/Forward10';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import api from '../../api';
import { useCourse } from '../../context/CourseContext';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const VideoDisplay = ({ url, lessonId, onWatched90 }) => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasReached90, setHasReached90] = useState(false);
  const videoRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const { updateLessonState } = useCourse();

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  const handleVideoEnd = async () => {
    try {
      await api.post(`/en/courses/lessons/${lessonId}/mark-watched/`, {
        lesson_id: lessonId,
        video_url: url,
        watched_duration: duration,
      });
    } catch (err) {
      console.error("Failed to send watch duration", err);
    }
  };

  // Reset states when lesson changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setHasReached90(false);
    setLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [lessonId]);

  useEffect(() => {
    if (duration > 0 && currentTime / duration >= 0.9 && !hasReached90) {
      setHasReached90(true);
      updateLessonState(lessonId, 'videoWatched', true);
      onWatched90?.();
    }
  }, [currentTime, duration, hasReached90, lessonId]);

  if (!url) return null;

  return (
    <Box
      position="relative"
      sx={{ width: '100%' }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}

      <video
        ref={videoRef}
        controls
        onCanPlayThrough={() => setLoading(false)}
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onEnded={handleVideoEnd}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '500px',
          borderRadius: '12px',
          display: loading ? 'none' : 'block',
          transition: 'box-shadow 0.3s ease',
          boxShadow: flash
            ? '0 0 25px 5px rgba(0, 123, 255, 0.5)'
            : '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <source src={url} type="video/mp4" />
      </video>

      {showControls && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <IconButton
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.max(
                  videoRef.current.currentTime - 10,
                  0
                );
                triggerFlash();
              }
            }}
            sx={{
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              width: 50,
              height: 50,
              pointerEvents: 'auto',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <Replay10 />
          </IconButton>

          <IconButton
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
            sx={{
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              width: 60,
              height: 60,
              pointerEvents: 'auto',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            {videoRef.current?.paused ? (
              <PlayArrow fontSize="large" />
            ) : (
              <Pause fontSize="large" />
            )}
          </IconButton>

          <IconButton
            onClick={() => {
              if (videoRef.current) {
                const videoDuration = videoRef.current.duration || 0;
                videoRef.current.currentTime = Math.min(
                  videoRef.current.currentTime + 10,
                  videoDuration
                );
                triggerFlash();
              }
            }}
            sx={{
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              width: 50,
              height: 50,
              pointerEvents: 'auto',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <Forward10 />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          mt: 1,
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '0.85rem',
        }}
      >
        {formatTime(currentTime)} / {formatTime(duration)}
      </Box>
    </Box>
  );
};

export default VideoDisplay;