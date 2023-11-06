import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Circles } from 'react-loader-spinner';

export default function Spinner  ({ isLoading, color }) {
  return (
      <LoadingOverlay
        active={isLoading}
        spinner={<Circles color={color ?? "var(--text-primary, #222)"} />}
      />
  );};



