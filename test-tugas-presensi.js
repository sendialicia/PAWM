// Test script untuk API tugas awal dan presensi
console.log('Testing Tugas Awal dan Presensi API...\n');

// Test 1: Submit tugas awal
async function testTugasAwal() {
  try {
    console.log('🧪 Testing Submit Tugas Awal...');
    
    const response = await fetch('http://localhost:3000/api/tugas-awal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 3, // Sendi's user ID
        modulId: 'ptb1-modul1',
        nama: 'Sendi Test',
        nim: '12345678',
        linkTugas: 'https://drive.google.com/file/d/test123/view',
        userRole: 'PRAKTIKAN'
      })
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Submit tugas awal berhasil!\n');
    } else {
      console.log('❌ Submit tugas awal gagal\n');
    }
  } catch (error) {
    console.error('❌ Error testing tugas awal:', error.message);
  }
}

// Test 2: Submit presensi
async function testPresensi() {
  try {
    console.log('🧪 Testing Submit Presensi...');
    
    const response = await fetch('http://localhost:3000/api/presensi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 3, // Sendi's user ID
        modulId: 'ptb1-modul1',
        nama: 'Sendi Test',
        nim: '12345678',
        kelompok: 'A',
        userRole: 'PRAKTIKAN'
      })
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Submit presensi berhasil!\n');
    } else {
      console.log('❌ Submit presensi gagal\n');
    }
  } catch (error) {
    console.error('❌ Error testing presensi:', error.message);
  }
}

// Test 3: Get tugas awal status
async function testGetTugasAwal() {
  try {
    console.log('🧪 Testing Get Tugas Awal Status...');
    
    const response = await fetch('http://localhost:3000/api/tugas-awal?userId=3&modulId=ptb1-modul1');
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Get tugas awal status berhasil!\n');
    } else {
      console.log('❌ Get tugas awal status gagal\n');
    }
  } catch (error) {
    console.error('❌ Error getting tugas awal status:', error.message);
  }
}

// Test 4: Get presensi status
async function testGetPresensi() {
  try {
    console.log('🧪 Testing Get Presensi Status...');
    
    const response = await fetch('http://localhost:3000/api/presensi?userId=3&modulId=ptb1-modul1');
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Get presensi status berhasil!\n');
    } else {
      console.log('❌ Get presensi status gagal\n');
    }
  } catch (error) {
    console.error('❌ Error getting presensi status:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  await testTugasAwal();
  await testPresensi();
  await testGetTugasAwal();
  await testGetPresensi();
  
  console.log('🎉 All tests completed!');
}

runAllTests();
