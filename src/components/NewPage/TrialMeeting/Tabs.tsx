
import React from 'react';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import RecommendMentor from '../../../pages/NewPages/TrialMeeting/RecommendMentor'; 
import TrialMentor from '../../../pages/NewPages/TrialMeeting/TrialMentor';

// For internal tab structure
interface TabValueProps {
  label: string;
  component: React.FC;
}

// Panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const IndependentTabs = () => {
  const [value, setValue] = React.useState(0);

  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabValue: TabValueProps[] = [
    {
      label: 'Recommended Mentors',
      component: RecommendMentor,
    },
    {
      label: 'Trial Mentors',
      component: TrialMentor,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '8px',
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: '#bbc4cc',
            boxShadow: 'none',
            borderRadius: '8px',
            width: '500px',
            marginLeft: '14px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            aria-label="custom tabs"
            sx={{ display: 'flex', gap: 2 }}
          >
            {TabValue.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                {...a11yProps(index)}
                sx={{
                  flex: 1,
                  color: 'black',
                  fontWeight: value === index ? 'bold' : 'normal',
                  backgroundColor: value === index ? 'white' : '',
                  borderRadius: '8px',
                }}
              />
            ))}
          </Tabs>
        </AppBar>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          marginTop: '16px',
        }}
      >
        {TabValue.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <tab.component />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default IndependentTabs;
