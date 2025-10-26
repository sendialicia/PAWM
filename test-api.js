// Test API endpoint secara langsung
async function testAPI() {
  try {
    // Test dengan permohonan ID 3 (yang masih PENDING)
    const response = await fetch('http://localhost:3000/api/permohonan/3', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'APPROVED',
        approvedBy: 'asisten@biomedis.com',
        keterangan: 'Test API dari script',
        userRole: 'ASISTEN'
      })
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (!response.ok) {
      console.error('API Error:', data.error);
    }
    
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testAPI();
