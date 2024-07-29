import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon"
import CogIcon from "@heroicons/react/24/solid/CogIcon"
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon"
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon"
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"
import StarIcon from "@heroicons/react/24/solid/StarIcon"
import {UsersIcon } from '@heroicons/react/24/solid';

import { SvgIcon } from '@mui/material';


export const items = [
  {
    href: '/',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'Home'
  },
  {
    href: '/employees',
    icon: (
      <SvgIcon>
        <UsersIcon />
      </SvgIcon>
    ),
    label: 'Employees'
  },
  {
    href: '/settings',
    icon: (
      <SvgIcon>
        <CogIcon />
      </SvgIcon>
    ),
    label: 'Settings'
  },
  {
    href: '/theme',
    icon: (
      <SvgIcon>
        <DocumentTextIcon />
      </SvgIcon>
    ),
    label: 'Theme'
  },
  {
    href: '/icons',
    icon: (
      <SvgIcon>
        <StarIcon />
      </SvgIcon>
    ),
    label: 'Icons'
  },
  {
    href: '/404',
    icon: (
      <SvgIcon>
        <ExclamationTriangleIcon />
      </SvgIcon>
    ),
    label: 'Error'
  }
];
