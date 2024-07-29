import React from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { items } from './Config';

const SIDE_NAV_WIDTH = 73;
const TOP_NAV_HEIGHT = 64;

export const SideNav = () => {
  const location = useLocation();

  return (
    <Drawer
      open
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: `calc(100% - ${TOP_NAV_HEIGHT}px)`,
          p: 1,
          top: TOP_NAV_HEIGHT,
          width: SIDE_NAV_WIDTH,
          zIndex: (theme) => theme.zIndex.appBar - 100,
          position: 'fixed', 
        }
      }}
    >
      <List sx={{ width: '100%' }}>
        {items.map((item) => {
          const active = matchPath({ path: item.href, end: true }, location.pathname);

          return (
            <ListItem
              disablePadding
              component={RouterLink}
              key={item.href}
              to={item.href}
              sx={{
                flexDirection: 'column',
                px: 2,
                py: 1.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  color: active ? '#1b8d1b' : 'neutral.400'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: 'caption',
                  sx: {
                    color: active ? '#157215' : 'text.secondary'
                  }
                }}
              />
              <h1 className='bg-[#1b8d1b]'></h1>
             
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

