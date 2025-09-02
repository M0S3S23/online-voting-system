const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000';

export const fetchElections = async () => {
  const res = await fetch(`${API_BASE_URL}/api/elections`);
  if (!res.ok) throw new Error('Failed to fetch elections');
  return res.json();
};

export const fetchElectionPositions = async (electionId) => {
  const res = await fetch(`${API_BASE_URL}/api/elections/${electionId}/positions`);
  if (!res.ok) throw new Error('Failed to fetch positions');
  return res.json();
};

export const submitApplication = async (electionId, payload) => {
  const res = await fetch(`${API_BASE_URL}/api/elections/${electionId}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to submit application' }));
    throw new Error(err.message || 'Failed to submit application');
  }
  return res.json();
};

export const fetchApplicationStatus = async (electionId, email) => {
  const url = new URL(`${API_BASE_URL}/api/elections/${electionId}/applications/status`);
  url.searchParams.set('email', email);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch application status');
  return res.json();
};


