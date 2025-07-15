import React, { useState } from 'react';
import './index.scss';

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'September 2023- Ongoing',
      title: 'THE CSHub member | York University',
      description: [
        'Participated in tech-focused events and workshops to deepen knowledge in programming, software development, and emerging technologies.',
  'Collaborated with fellow members on coding projects and networking activities, helping to build a supportive and engaging tech community.',
      ],
      expanded: false,
    },
    {
      date: '      SEPTEMBER 2022-Ongoing ',
      title: 'TREASURER & MEDIA COORDINATOR| Somali Student Association (SSA) ',
      description: [
        "Boosted online engagement and membership by 50% through targeted outreach and community initiatives.",
  "Established connections between SSA members and professionals/alumni, fostering mentorship and career guidance opportunities.",
      ],
      expanded: false,
    },
    {
      date: 'May-September 2022',
      title: 'ACM Programming Contest | York University          ',
      description: [
         "Competed in York University’s internal programming contests to qualify for the regional ACM Programming Contest team.",
  "Solved algorithmic and data structure problems under timed conditions, demonstrating strong problem-solving and coding skills.",
      ],
      expanded: false,
    },
  ]);

  const handleItemClick = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event, idx) => {
        if (idx === index) {
          return { ...event, expanded: !event.expanded };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  return (
    <div className="timeline-container">
      {events.map((event, index) => (
        <div
          className={`timeline-item ${event.expanded ? 'expanded' : ''}`}
          key={index}
          onClick={() => handleItemClick(index)}
        >
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h2>{event.title}</h2>
            {event.expanded ? (
              <div>
                {event.description.map((desc, descIndex) => (
                  <p key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </div>
            ) : (
              <>
                <div className="more">
                  <p>Click for more</p>
                </div>
                <div className="date">{event.date}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
