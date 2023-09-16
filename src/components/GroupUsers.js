import React from 'react';
import { useLocation } from 'react-router-dom';

export default function GroupUsers() {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div>some {JSON.stringify(data)}</div>
  )
}
