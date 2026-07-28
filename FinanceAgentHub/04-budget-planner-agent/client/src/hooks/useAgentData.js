import { useState, useEffect } from 'react';

export function useAgentData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return { data, loading };
}
