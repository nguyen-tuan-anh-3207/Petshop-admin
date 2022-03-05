import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

export default function OrderMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={() => console.log('detail....')}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xem" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} >
          <ListItemIcon >
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
}
