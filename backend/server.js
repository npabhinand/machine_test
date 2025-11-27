const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());


let contacts = [
  { id: 1, name: "John Smith", email: "john.smith@techcorp.com", phone: "+1-555-0101", company: "Tech Corp", position: "Senior Software Engineer", status: "Active", lastContact: "2024-01-15", category: "Work" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@designstudio.com", phone: "+1-555-0102", company: "Design Studio Inc", position: "Lead UI/UX Designer", status: "Active", lastContact: "2024-01-12", category: "Work" },
  { id: 3, name: "Michael Chen", email: "michael.chen@financegroup.com", phone: "+1-555-0103", company: "Finance Group LLC", position: "Financial Analyst", status: "Active", lastContact: "2024-01-10", category: "Business" },
  { id: 4, name: "Emily Davis", email: "emily.davis@healthplus.org", phone: "+1-555-0104", company: "Health Plus Medical", position: "Chief Medical Officer", status: "Inactive", lastContact: "2023-12-20", category: "Business" },
  { id: 5, name: "Robert Brown", email: "robert.brown@university.edu", phone: "+1-555-0105", company: "State University", position: "Professor of Computer Science", status: "Active", lastContact: "2024-01-08", category: "Work" },
  { id: 6, name: "Lisa Anderson", email: "lisa.anderson@retailpro.com", phone: "+1-555-0106", company: "Retail Pro Solutions", position: "Regional Manager", status: "Inactive", lastContact: "2023-11-30", category: "Business" },
  { id: 7, name: "David Miller", email: "david.miller@autocare.com", phone: "+1-555-0107", company: "Auto Care Solutions", position: "Service Manager", status: "Active", lastContact: "2024-01-14", category: "Personal" },
  { id: 8, name: "Jennifer Lee", email: "jennifer.lee@culinaryarts.com", phone: "+1-555-0108", company: "Culinary Arts Studio", position: "Executive Chef", status: "Active", lastContact: "2024-01-09", category: "Work" },
  { id: 9, name: "Kevin Taylor", email: "kevin.taylor@buildright.com", phone: "+1-555-0109", company: "Build Right Construction", position: "Project Manager", status: "Inactive", lastContact: "2023-12-15", category: "Business" },
  { id: 10, name: "Amanda White", email: "amanda.white@legalpartners.com", phone: "+1-555-0110", company: "Legal Partners LLP", position: "Senior Attorney", status: "Active", lastContact: "2024-01-11", category: "Work" },

  { id: 11, name: "Brandon Young", email: "brandon.young@cloudtech.io", phone: "+1-555-0111", company: "CloudTech", position: "DevOps Engineer", status: "Active", lastContact: "2024-01-14", category: "Work" },
  { id: 12, name: "Olivia Martinez", email: "olivia.martinez@mediahub.com", phone: "+1-555-0112", company: "MediaHub", position: "Content Strategist", status: "Inactive", lastContact: "2023-12-22", category: "Business" },
  { id: 13, name: "Daniel Thompson", email: "daniel.thompson@automax.com", phone: "+1-555-0113", company: "AutoMax", position: "Operations Manager", status: "Active", lastContact: "2024-01-15", category: "Business" },
  { id: 14, name: "Sophia Wilson", email: "sophia.wilson@eduhub.edu", phone: "+1-555-0114", company: "EduHub", position: "Education Consultant", status: "Active", lastContact: "2024-01-13", category: "Work" },
  { id: 15, name: "Ethan Brown", email: "ethan.brown@finserve.com", phone: "+1-555-0115", company: "FinServe", position: "Investment Advisor", status: "Inactive", lastContact: "2023-12-10", category: "Business" },
  { id: 16, name: "Grace Kim", email: "grace.kim@wellnesslife.org", phone: "+1-555-0116", company: "Wellness Life", position: "Health Consultant", status: "Active", lastContact: "2024-01-09", category: "Business" },
  { id: 17, name: "Henry Lewis", email: "henry.lewis@softwave.com", phone: "+1-555-0117", company: "SoftWave", position: "Full Stack Developer", status: "Active", lastContact: "2024-01-12", category: "Work" },
  { id: 18, name: "Victoria Adams", email: "victoria.adams@fashionline.com", phone: "+1-555-0118", company: "FashionLine", position: "Creative Director", status: "Inactive", lastContact: "2023-11-28", category: "Business" },
  { id: 19, name: "Christopher Walker", email: "christopher.walker@logix.com", phone: "+1-555-0119", company: "Logix", position: "Logistics Coordinator", status: "Active", lastContact: "2024-01-11", category: "Business" },
  { id: 20, name: "Natalie Green", email: "natalie.green@homespace.com", phone: "+1-555-0120", company: "HomeSpace Realty", position: "Real Estate Agent", status: "Active", lastContact: "2024-01-10", category: "Work" },

  { id: 21, name: "Samuel Reed", email: "samuel.reed@techverse.com", phone: "+1-555-0121", company: "TechVerse", position: "Backend Engineer", status: "Inactive", lastContact: "2023-12-18", category: "Work" },
  { id: 22, name: "Ava Peterson", email: "ava.peterson@greenleaf.org", phone: "+1-555-0122", company: "GreenLeaf Org", position: "Environmental Analyst", status: "Active", lastContact: "2024-01-08", category: "Business" },
  { id: 23, name: "Jacob Scott", email: "jacob.scott@brightlight.com", phone: "+1-555-0123", company: "BrightLight Media", position: "Marketing Manager", status: "Active", lastContact: "2024-01-12", category: "Work" },
  { id: 24, name: "Ella Turner", email: "ella.turner@healtheasy.org", phone: "+1-555-0124", company: "HealthEasy", position: "Nutrition Specialist", status: "Inactive", lastContact: "2023-12-05", category: "Business" },
  { id: 25, name: "Mason Baker", email: "mason.baker@citybuild.com", phone: "+1-555-0125", company: "CityBuild", position: "Construction Supervisor", status: "Active", lastContact: "2024-01-14", category: "Work" },
  { id: 26, name: "Zoe Parker", email: "zoe.parker@fashionworld.com", phone: "+1-555-0126", company: "FashionWorld", position: "Brand Manager", status: "Active", lastContact: "2024-01-16", category: "Work" },
  { id: 27, name: "Logan Brooks", email: "logan.brooks@smartretail.com", phone: "+1-555-0127", company: "SmartRetail", position: "Retail Analyst", status: "Inactive", lastContact: "2023-12-01", category: "Business" },
  { id: 28, name: "Harper Mitchell", email: "harper.mitchell@aerotech.com", phone: "+1-555-0128", company: "AeroTech", position: "Aerospace Engineer", status: "Active", lastContact: "2024-01-10", category: "Work" },
  { id: 29, name: "Nathan King", email: "nathan.king@realtygroup.com", phone: "+1-555-0129", company: "RealtyGroup", position: "Real Estate Consultant", status: "Active", lastContact: "2024-01-09", category: "Business" },
  { id: 30, name: "Chloe Rivera", email: "chloe.rivera@foodlovers.com", phone: "+1-555-0130", company: "FoodLovers", position: "Food Critic", status: "Active", lastContact: "2024-01-10", category: "Personal" },

  { id: 31, name: "Eli Cooper", email: "eli.cooper@travelmate.com", phone: "+1-555-0131", company: "TravelMate", position: "Travel Consultant", status: "Inactive", lastContact: "2023-12-12", category: "Business" },
  { id: 32, name: "Hannah Stewart", email: "hannah.stewart@beautynest.com", phone: "+1-555-0132", company: "BeautyNest", position: "Cosmetic Specialist", status: "Active", lastContact: "2024-01-11", category: "Work" },
  { id: 33, name: "Caleb Ramirez", email: "caleb.ramirez@techflow.com", phone: "+1-555-0133", company: "TechFlow", position: "Frontend Developer", status: "Active", lastContact: "2024-01-14", category: "Work" },
  { id: 34, name: "Aria Hughes", email: "aria.hughes@artvision.com", phone: "+1-555-0134", company: "ArtVision", position: "Creative Illustrator", status: "Inactive", lastContact: "2023-11-29", category: "Personal" },
  { id: 35, name: "Ryan Foster", email: "ryan.foster@logimap.com", phone: "+1-555-0135", company: "LogiMap", position: "Delivery Supervisor", status: "Active", lastContact: "2024-01-15", category: "Business" },
  { id: 36, name: "Lily Wood", email: "lily.wood@techzone.com", phone: "+1-555-0136", company: "TechZone", position: "IT Support Specialist", status: "Active", lastContact: "2024-01-08", category: "Work" },
  { id: 37, name: "Miles Perry", email: "miles.perry@autoworld.com", phone: "+1-555-0137", company: "AutoWorld", position: "Auto Mechanic", status: "Inactive", lastContact: "2023-12-17", category: "Business" },
  { id: 38, name: "Avery Brooks", email: "avery.brooks@finplus.com", phone: "+1-555-0138", company: "FinPlus", position: "Finance Officer", status: "Active", lastContact: "2024-01-09", category: "Business" },
  { id: 39, name: "Julia Bennett", email: "julia.bennett@learninghub.edu", phone: "+1-555-0139", company: "LearningHub", position: "Academic Advisor", status: "Active", lastContact: "2024-01-12", category: "Work" },
  { id: 40, name: "Owen Phillips", email: "owen.phillips@freshfarm.com", phone: "+1-555-0140", company: "FreshFarm", position: "Agricultural Specialist", status: "Inactive", lastContact: "2023-12-08", category: "Business" },

  { id: 41, name: "Charlotte Murphy", email: "charlotte.murphy@medico.org", phone: "+1-555-0141", company: "MedicoCare", position: "Nurse Practitioner", status: "Active", lastContact: "2024-01-14", category: "Business" },
  { id: 42, name: "Isaac Carter", email: "isaac.carter@buildsmart.com", phone: "+1-555-0142", company: "BuildSmart", position: "Civil Engineer", status: "Active", lastContact: "2024-01-10", category: "Work" },
  { id: 43, name: "Maya Wilson", email: "maya.wilson@creativebox.com", phone: "+1-555-0143", company: "CreativeBox", position: "Graphic Designer", status: "Active", lastContact: "2024-01-09", category: "Work" },
  { id: 44, name: "Gavin Edwards", email: "gavin.edwards@hypertech.io", phone: "+1-555-0144", company: "HyperTech", position: "AI Engineer", status: "Inactive", lastContact: "2023-12-02", category: "Work" },
  { id: 45, name: "Ronald Carter", email: "ronald.carter@sports.com", phone: "+1-555-0145", company: "Sports Equipment Co", position: "Sales Representative", status: "Active", lastContact: "2023-12-06", category: "Business" }
];


// Dashboard data
// Dashboard data - FIXED STRUCTURE
const activeContactData = {
  rs1: { total: 45 },  // ← Changed from array to object with total count
  rs2: [
    { name: "Work Contacts", count: 25 },      // ← Changed 'value' to 'count'
    { name: "Business Contacts", count: 15 },  // ← Changed 'value' to 'count'
    { name: "Personal Contacts", count: 5 }    // ← Changed 'value' to 'count'
  ]
};

const chartData = {
  rs1: [
    { date: "2024-01-01", searchResults: 45, listingViews: 23 },
    { date: "2024-01-02", searchResults: 52, listingViews: 28 },
    { date: "2024-01-03", searchResults: 38, listingViews: 19 },
    { date: "2024-01-04", searchResults: 67, listingViews: 34 },
    { date: "2024-01-05", searchResults: 73, listingViews: 41 },
    { date: "2024-01-06", searchResults: 58, listingViews: 29 },
    { date: "2024-01-07", searchResults: 62, listingViews: 33 },
    { date: "2024-01-08", searchResults: 78, listingViews: 45 },
    { date: "2024-01-09", searchResults: 81, listingViews: 52 },
    { date: "2024-01-10", searchResults: 65, listingViews: 38 }
  ],
  rs2: [
    { 
      property: "123 Main St, New York, NY", 
      value: 450, 
      searchResults: 45, 
      listingViews: 23 // ← Added listingViews to match your type
    },
    { 
      property: "456 Oak Ave, Los Angeles, CA", 
      value: 320, 
       searchResults: 78,
      listingViews: 96 
    },
    { 
      property: "789 Pine Rd, Chicago, IL", 
      value: 280,
      searchResults: 45, 
      listingViews: 84 
    },
    { 
      property: "321 Elm St, Houston, TX", 
      value: 190, 
       searchResults: 45,
      listingViews: 57 
    },
    { 
      property: "654 Maple Dr, Phoenix, AZ", 
      value: 150, 
     searchResults: 45,
      listingViews: 45 
    }
  ]
};
// Contacts API with pagination, search, and filtering
app.get('/contacts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const status = req.query.status || '';
  const category = req.query.category || '';
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';

  // Filter contacts based on search and filters
  let filteredContacts = contacts.filter(contact => {
    const matchesSearch = !search || 
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !status || contact.status === status;
    const matchesCategory = !category || contact.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Enhanced sorting logic
  filteredContacts.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle nested properties for contact column
    if (sortBy === 'contact') {
      aValue = a.name;
      bValue = b.name;
    }
    
    // Handle nested properties for company column
    if (sortBy === 'company') {
      aValue = a.company;
      bValue = b.company;
    }

    // Handle date sorting for lastContact
    if (sortBy === 'lastContact') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle string comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    // Handle undefined/null values
    if (aValue === undefined || aValue === null) aValue = '';
    if (bValue === undefined || bValue === null) bValue = '';

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  res.json({
    contacts: paginatedContacts,
    total: filteredContacts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredContacts.length / limit),
    sortBy,
    sortOrder
  });
});

// Active contacts data
app.get('/activecontact', (req, res) => {
  res.json(activeContactData);
});

// Chart data
app.get('/chartdata', (req, res) => {
  res.json(chartData);
});

// Delete contacts (bulk delete)
app.delete('/contacts', (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid request. IDs array required.' });
  }

  // Filter out deleted contacts
  contacts = contacts.filter(contact => !ids.includes(contact.id));

  res.json({
    success: true,
    message: `Successfully deleted ${ids.length} contacts`,
    deletedIds: ids
  });
});


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Contacts API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📞 Contacts API: http://localhost:${PORT}/contacts`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/activecontact`);
  console.log(`📈 Chart API: http://localhost:${PORT}/chartdata`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});