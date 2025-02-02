// pages/ShopPage.tsx
import { FC } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { TimelineConnector, TimelineContent, TimelineDescription, TimelineItem, TimelineRoot, TimelineTitle } from '../components/timeline.tsx';
import { FaInfo } from 'react-icons/fa';
import { GameConfig } from '../shared/configs/game.config.ts';
import { Link } from 'react-router-dom';
import { StatusTask } from '../shared/types/statusTask.enum.ts';

const MapPage: FC = () => {
  const {
    chapters,
    availableChapters,
  } = useAppSelector((state) => state.user);

  return (
    <Box p={4}>
      {availableChapters.map((elementType, index) => {
        const element = GameConfig[elementType];
        const isCompleted = !!chapters.find(c => c.type === elementType && c.status === StatusTask.COMPLETED);
        return (
          <TimelineRoot key={`timeline-root-${index}`}>
            <TimelineItem key={`timeline-item-1-${index}`}>
              <TimelineConnector style={{ background: element.backgroundColor }} key={`timeline-connector-1-${index}`}>
                <FaInfo key={`timeline-icon-1-${index}`} style={{ color: element.iconColor }} />
              </TimelineConnector>
              <TimelineContent key={`timeline-content-1-${index}`}>
                <TimelineTitle key={`timeline-title-1-${index}`} style={{ color: element.iconColor }}>{element.chapterTitle} - {element.chapterDate}.</TimelineTitle>
                <TimelineDescription key={`timeline-description-1-${index}`} style={{ marginBottom: '10px' }}>
                  {element.chapterDescription}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <Link to={element.url} key={`timeline-link-${index}`}>
              <TimelineItem key={`timeline-item-2-${index}`} style={{ marginBottom: '25px' }}>
                <TimelineConnector key={`timeline-connector-2-${index}`} style={{ background: element.backgroundColor }}>
                  <Icon key={`timeline-icon-2-${index}`} style={{ color: element.iconColor }} as={element.icon} />
                </TimelineConnector>
                <TimelineContent key={`timeline-content-2-${index}`}>
                  <TimelineTitle key={`timeline-title-2-${index}`} style={{ color: element.iconColor }} textStyle="sm">{isCompleted ? '(Пройдено)' : ''}Mіні-гра: {element.questName} (**Нажми на
                    мене**)</TimelineTitle>
                  <TimelineDescription key={`timeline-description-2-${index}`}>{element.questDescription}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </Link>
          </TimelineRoot>
        );
      })}

    </Box>
  );
};

export default MapPage;