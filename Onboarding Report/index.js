const _ = require('lodash');

const data = [
    {
        "outletName": "YASH TRADERS",
        "ownerName": "VIKASH  KUMAR",
        "emailId": "vikashkumar.grk@gmail.com",
        "phone": "+919934947311",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-04-27T16:08:06.759Z"
    },
    {
        "outletName": "MAHABIR TRADERS",
        "ownerName": "PRAN PRASAD",
        "emailId": "shashikumar1242@gmail.com",
        "phone": "+918340542794",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-04-27T17:37:52.713Z"
    },
    {
        "outletName": "MOPA DISTRIBUTORS PRIVATE LIMITED",
        "ownerName": "MOHIN SUNIL SHAH",
        "emailId": "mopadist@gmail.com",
        "phone": "+919920234982",
        "regionName": "WEST",
        "stateCode": "27",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-05-05T15:35:59.408Z"
    },
    {
        "outletName": "MEHEK ENTERPRISES",
        "ownerName": "SHIRISH KUMAR",
        "emailId": "mehekagency15@gmail.com",
        "phone": "+919619356346",
        "regionName": "WEST",
        "stateCode": "27",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-05-06T08:22:55.195Z"
    },
    {
        "outletName": "BALAJI ENTERPRISES",
        "ownerName": "MANOJ KUMAR MORYA",
        "emailId": "balajienterprises@gmail.com",
        "phone": "+919819094640",
        "regionName": "WEST",
        "stateCode": "27",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-05-06T08:34:06.103Z"
    },
    {
        "outletName": "SANKALP CREATION",
        "ownerName": "RAVINDRA KUMAR",
        "emailId": "rohit1638@gmail.com",
        "phone": "+919771499685",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-05-17T10:37:04.326Z"
    },
    {
        "outletName": "VRISHANK",
        "ownerName": "ARYAN",
        "emailId": "vrishank.crompton@gmail.com",
        "phone": "+917004413447",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-05-19T09:43:13.145Z"
    },
    {
        "outletName": "MUSKAN ENTERPRISES",
        "ownerName": "SHASHI BALA SINGH",
        "emailId": "ment.pat@gmail.com",
        "phone": "+919431043287",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-05-25T03:45:59.593Z"
    },
    {
        "outletName": "BHAGWATI ENTERPRISES",
        "ownerName": "Kishor Kunal",
        "emailId": "kunaljais1711@gmail.com",
        "phone": "+919304239005",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 1,
        "createdAt": "2021-05-28T04:45:32.102Z"
    },
    {
        "outletName": "BALAJEE SALES",
        "ownerName": "PRATIK DALMIA",
        "emailId": "balajeesales16@gmail.com",
        "phone": "+919431154276",
        "regionName": "CENTRALEAST",
        "stateCode": "20",
        "applicationStatus": "Rejected",
        "underRole": "Regional Sales Admin",
        "adminEmail": "lipaguha@britindia.com",
        "priority": 4,
        "totalForwardedCount": 2,
        "createdAt": "2021-06-10T15:09:22.682Z"
    },
    {
        "outletName": "RAJESHWARI DISTRIBUTORS",
        "ownerName": "RAHUL PRABHAKAR SHETE",
        "emailId": "rajeshwarisatara2020@gmail.com",
        "phone": "+919422033878",
        "regionName": "WEST",
        "stateCode": "27",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-06-18T11:37:24.168Z"
    },
    {
        "outletName": "PADAMSHRI ENTERPRISE",
        "ownerName": "VIMALABEN SUBHASHCHANDRA GANDHI",
        "emailId": "padamshrienterprise@gmail.com",
        "phone": "+919428012342",
        "regionName": "WEST",
        "stateCode": "24",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-06-18T17:13:37.992Z"
    },
    {
        "outletName": "VAISHNAVI TRADERS",
        "ownerName": "AMARNATH GUPTA",
        "emailId": "amarnwd2021@gmail.com",
        "phone": "+917979786892",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 9,
        "createdAt": "2021-06-26T10:36:42.117Z"
    },
    {
        "outletName": "Nirmila Trading",
        "ownerName": "Manish kumar kedia",
        "emailId": "nirmala_040@rediffmail.com",
        "phone": "+919934775819",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-06-28T07:39:57.627Z"
    },
    {
        "outletName": "LUNIA SALES AGENCY",
        "ownerName": "SARITA LUNIA",
        "emailId": "lunia.prakash17@gmail.com",
        "phone": "+919470611121",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Under Review",
        "underRole": "Senior Manager SDM",
        "adminEmail": "abhisheksaxena@britindia.com",
        "priority": 12,
        "totalForwardedCount": 10,
        "createdAt": "2021-06-30T07:58:04.805Z"
    },
    {
        "outletName": "GARODIA TRADERS",
        "ownerName": "KISHAN GARODIA",
        "emailId": "garodia.traders@gmail.com",
        "phone": "+919334751888",
        "regionName": "CENTRALEAST",
        "stateCode": "20",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-06-30T12:55:22.038Z"
    },
    {
        "outletName": "SHREE ENTERPRISES",
        "ownerName": "MADHUR AGARWAL",
        "emailId": "shreeenterprises.gts@gmail.com",
        "phone": "+919835130635",
        "regionName": "CENTRALEAST",
        "stateCode": "20",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-01T13:59:34.785Z"
    },
    {
        "outletName": "BIMAL ENTERPRISES",
        "ownerName": "BIMAL KUMAR SARAF",
        "emailId": "bimalkumarsharaf_bounsi@yahoo.com",
        "phone": "+919934060085",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 9,
        "createdAt": "2021-07-03T12:01:23.977Z"
    },
    {
        "outletName": "SHREE AGENCY",
        "ownerName": "LAL AMIT",
        "emailId": "shrijiagency@yahoo.com",
        "phone": "+919428317921",
        "regionName": "WEST",
        "stateCode": "24",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-08T05:16:52.665Z"
    },
    {
        "outletName": "NITINKUMAR MUKUNDRAI",
        "ownerName": "Nitinbhai Mukundrai Desai",
        "emailId": "nitinbhaidesai83@gmail.com",
        "phone": "+919033771340",
        "regionName": "WEST",
        "stateCode": "24",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-08T06:29:08.986Z"
    },
    {
        "outletName": "GLORY ENTERPRISES",
        "ownerName": "Garima Agrawal",
        "emailId": "abhinavagrawal.020@gmail.com",
        "phone": "+917745900590",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-08T08:34:45.419Z"
    },
    {
        "outletName": "M/S JAI MAHAVIR TRADERS",
        "ownerName": "ASHA JAIN",
        "emailId": "himanshu619jain@gmail.com",
        "phone": "+917735170128",
        "regionName": "EAST",
        "stateCode": "21",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-09T11:14:15.760Z"
    },
    {
        "outletName": "SWAYAM ENTERPRISES",
        "ownerName": "SANJEEB KUMAR DASH",
        "emailId": "sanjeebtukuna74@gmail.com",
        "phone": "+919438637404",
        "regionName": "EAST",
        "stateCode": "21",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-09T12:49:45.414Z"
    },
    {
        "outletName": "JAI MAHADEV AGENCY",
        "ownerName": "DILIP KHANDELWAL",
        "emailId": "lokesh2610@yahoo.co.in",
        "phone": "+919826317081",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-10T09:38:06.574Z"
    },
    {
        "outletName": "VSM AGENCY",
        "ownerName": "MADAN GOPAL",
        "emailId": "ladharmadan@gmail.com",
        "phone": "+919774090426",
        "regionName": "EAST",
        "stateCode": "12",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 1,
        "createdAt": "2021-07-10T09:49:16.334Z"
    },
    {
        "outletName": "SHREE SANWARIYA AGENCY",
        "ownerName": "NARAYAN LAL BAGWAN",
        "emailId": "naruj15@gmail.com",
        "phone": "+918824500789",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-10T10:07:35.959Z"
    },
    {
        "outletName": "VSM AGENCY",
        "ownerName": "MADAN GOPAL",
        "emailId": "vladhar.hmt@gmail.com",
        "phone": "+919612157450",
        "regionName": "EAST",
        "stateCode": "12",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 1,
        "createdAt": "2021-07-12T06:35:41.622Z"
    },
    {
        "outletName": "MAHANANDA AGARBATTI COMPANY",
        "ownerName": "Kundan  Ray Adlakha",
        "emailId": "kundanraiadlakha@gmail.com",
        "phone": "+918114489114",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-12T06:54:40.754Z"
    },
    {
        "outletName": "DIVESH TRADERS",
        "ownerName": "DIVESH MITTAL",
        "emailId": "manish.mittal273@gmail.com",
        "phone": "+918839295808",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 2,
        "createdAt": "2021-07-12T06:56:49.727Z"
    },
    {
        "outletName": "KGS 365 LOGISTICS SOLUTION",
        "ownerName": "MADHULATA SONI",
        "emailId": "kgs.raipur@gmail.com",
        "phone": "+917999391775",
        "regionName": "WEST",
        "stateCode": "22",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 6,
        "createdAt": "2021-07-12T11:29:57.965Z"
    },
    {
        "outletName": "ARUSH TRADERS,MANGLPURA JHALAWAR",
        "ownerName": "MOHINI CHOURASIYA",
        "emailId": "arushtradersjwr@gmail.com",
        "phone": "+919414193768",
        "regionName": "NORTH",
        "stateCode": "08",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-13T08:30:50.798Z"
    },
    {
        "outletName": "AYUSH ABHINANDAN ENTERPRISES",
        "ownerName": "KHUSHBU DEVI",
        "emailId": "aaesnp2020@gmail.com",
        "phone": "+918102863932",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 0,
        "createdAt": "2021-07-13T11:07:52.123Z"
    },
    {
        "outletName": "M/S JAISWAL TRADERS.PROP-BINOD JAISWAL",
        "ownerName": "Binod Jaiswal",
        "emailId": "hkjaiswal3@gmail.com",
        "phone": "+917654772570",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 1,
        "createdAt": "2021-07-13T12:23:26.738Z"
    },
    {
        "outletName": "Hari Sales Agency",
        "ownerName": "Mitesh Rajesh Mehta",
        "emailId": "miteshmehta43@gmail.com",
        "phone": "+919028676007",
        "regionName": "WEST",
        "stateCode": "27",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 8,
        "createdAt": "2021-07-14T07:03:37.906Z"
    },
    {
        "outletName": "MOHANLAL MANGILAL",
        "ownerName": "Rajendra kumar Prajapati",
        "emailId": "mohanlalmangilal2021@gmail.com",
        "phone": "+919602006820",
        "regionName": "NORTH",
        "stateCode": "08",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-14T12:51:16.754Z"
    },
    {
        "outletName": "SATYAM ENTERPRISES",
        "ownerName": "NAVEEN GARG",
        "emailId": "tikamchand.garg900@gmail.com",
        "phone": "+919782310666",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-14T15:57:44.324Z"
    },
    {
        "outletName": "M/S HAPPY STORE",
        "ownerName": "KUDECHO KHAMO",
        "emailId": "happystorkma@gmail.com",
        "phone": "+919436071724",
        "regionName": "EAST",
        "stateCode": "13",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-15T03:03:57.537Z"
    },
    {
        "outletName": "PAARTH AGENCY",
        "ownerName": "SUSHAMA PARIKH",
        "emailId": "paarthagencymds@gmail.com",
        "phone": "+917898701978",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-15T09:26:51.405Z"
    },
    {
        "outletName": "JINDAL AGENCIES",
        "ownerName": "SHREE RAM PEETY",
        "emailId": "mdrj_2003@rediffmail.com",
        "phone": "+919829217511",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 0,
        "createdAt": "2021-07-15T09:47:04.762Z"
    },
    {
        "outletName": "SHAH GANESHMAL SOHANLAL GUNDECHA",
        "ownerName": "SHRAINIK RAJ",
        "emailId": "jainrajesh550@gmail.com",
        "phone": "+919829217672",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 0,
        "createdAt": "2021-07-15T09:49:44.840Z"
    },
    {
        "outletName": "BISWAS AGENCY",
        "ownerName": "AMIT BISWAS",
        "emailId": "sarengabiswasagency@gmail.com",
        "phone": "+918768742839",
        "regionName": "EAST",
        "stateCode": "19",
        "applicationStatus": "Under Review",
        "underRole": "RSM",
        "adminEmail": "nikhilak@britindia.com",
        "priority": 9,
        "totalForwardedCount": 6,
        "createdAt": "2021-07-16T17:25:48.535Z"
    },
    {
        "outletName": "MANOJ KUMAR GUPTA",
        "ownerName": "MANOJ KUMAR GUPTA",
        "emailId": "manoj1978.mellibazar@gmail.com",
        "phone": "+919733391414",
        "regionName": "EAST",
        "stateCode": "11",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-17T09:49:40.197Z"
    },
    {
        "outletName": "P.R.& CO.",
        "ownerName": "Santosh",
        "emailId": "prandcom2011@gmail.com",
        "phone": "+919352006661",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-17T11:08:53.980Z"
    },
    {
        "outletName": "DEBASISH SAHA",
        "ownerName": "DEBASISH SAHA",
        "emailId": "debasishsaha116@gmail.com",
        "phone": "+919064802826",
        "regionName": "EAST",
        "stateCode": "19",
        "applicationStatus": "Under Review",
        "underRole": "RSM",
        "adminEmail": "nikhilak@britindia.com",
        "priority": 9,
        "totalForwardedCount": 7,
        "createdAt": "2021-07-19T12:42:10.134Z"
    },
    {
        "outletName": "RADHA TRADERS",
        "ownerName": "TARUN SHARMA",
        "emailId": "tarunsm1990@gmail.com",
        "phone": "+919760007795",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-19T15:31:29.770Z"
    },
    {
        "outletName": "M/S QUALITY DISTRIBUTERS",
        "ownerName": "ANUJ VERMA",
        "emailId": "kwalitydistributor2015@gmail.com",
        "phone": "+919005459666",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Under Review",
        "underRole": "Regional Commercial",
        "adminEmail": "vpopli@britindia.com",
        "priority": 7,
        "totalForwardedCount": 4,
        "createdAt": "2021-07-20T03:57:26.432Z"
    },
    {
        "outletName": "PAREEK TRADERS",
        "ownerName": "CHANDAN MAL PAREEK",
        "emailId": "pareek_traders_lks@yahoo.com",
        "phone": "+919829226012",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-20T05:08:52.903Z"
    },
    {
        "outletName": "Paras Distributors",
        "ownerName": "Paras Rastogi",
        "emailId": "parashandy89@gmail.com",
        "phone": "+918393921602",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 7,
        "createdAt": "2021-07-20T06:45:08.051Z"
    },
    {
        "outletName": "VISHAL AGENCIES",
        "ownerName": "Kanchan Tirthani",
        "emailId": "ravinat54@gmail.com",
        "phone": "+919340971917",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 8,
        "createdAt": "2021-07-20T09:03:30.699Z"
    },
    {
        "outletName": "MUKESH AGENCY",
        "ownerName": "MUKESH KUMAR AGRAWAL",
        "emailId": "mukeshmittal9926@gmail.com",
        "phone": "+918358836416",
        "regionName": "WEST",
        "stateCode": "22",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-20T09:27:31.633Z"
    },
    {
        "outletName": "RAM RAGHAV ENTERPRISES",
        "ownerName": "ALOK GUPTA",
        "emailId": "ramraghav.ent@gmail.com",
        "phone": "+919029400914",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 8,
        "createdAt": "2021-07-20T13:17:32.229Z"
    },
    {
        "outletName": "Shreya Enterprises",
        "ownerName": "PAWANESH KUMAR MISHRA",
        "emailId": "pawaneshmishra05@gmail.com",
        "phone": "+917388763366",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": true,
        "eSignLevel": 1,
        "createdAt": "2021-07-21T07:48:38.964Z"
    },
    {
        "outletName": "ARCHANA SALES AGENCIES",
        "ownerName": "Mahesh Kumar Jangir",
        "emailId": "archana.sales.agencies@gmail.com",
        "phone": "+919983339121",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-21T07:54:47.796Z"
    },
    {
        "outletName": "MATESWARI MARKETING",
        "ownerName": "Archana",
        "emailId": "mateswarisikar@gmail.com",
        "phone": "+919829699919",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Under Review",
        "underRole": "Regional Sales Admin",
        "adminEmail": "rkumar@britindia.com",
        "priority": 4,
        "totalForwardedCount": 2,
        "createdAt": "2021-07-21T08:02:55.010Z"
    },
    {
        "outletName": "M/S KRISHNA AGENCIES",
        "ownerName": "NILESH KUMAR",
        "emailId": "neeleshgupta9557@gmail.com",
        "phone": "+919927763345",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 7,
        "createdAt": "2021-07-21T14:59:28.364Z"
    },
    {
        "outletName": "SAHA ENTERPRISES",
        "ownerName": "NIRANJAN SAHA",
        "emailId": "saha.enterprises2013@rediffmail.com",
        "phone": "+919051156155",
        "regionName": "EAST",
        "stateCode": "19",
        "applicationStatus": "Under Review",
        "underRole": "SOM",
        "adminEmail": "ejazulislam@britindia.com",
        "priority": 3,
        "totalForwardedCount": 2,
        "createdAt": "2021-07-21T16:45:45.874Z"
    },
    {
        "outletName": "SHRI KRISHNA TRADERS",
        "ownerName": "POOJA GOYAL",
        "emailId": "shreekrishnatraders2406@gmail.com",
        "phone": "+918000962053",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-22T13:41:28.793Z"
    },
    {
        "outletName": "LALWANI ENTERPRISES",
        "ownerName": "Divy Kumar Lalwani",
        "emailId": "divylalwani99@gmail.com",
        "phone": "+919602043374",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": false,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-23T07:08:10.222Z"
    },
    {
        "outletName": "ARIHANT AGENCIES AND ELECTRICALS",
        "ownerName": "GAUTAM SUKALAL JAIN",
        "emailId": "gautamjn7@gmail.com",
        "phone": "+919422764197",
        "regionName": "WEST",
        "stateCode": "27",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 7,
        "createdAt": "2021-07-23T10:05:13.414Z"
    },
    {
        "outletName": "TULSIRAM SITARAM",
        "ownerName": "DIPAK BALKRISHNA SANDHANSHIV",
        "emailId": "tsskiranamerchants@gmail.com",
        "phone": "+917776921116",
        "regionName": "WEST",
        "stateCode": "27",
        "applicationStatus": "Under Review",
        "underRole": "Regional Commercial",
        "adminEmail": "bkaudare@britindia.com",
        "priority": 7,
        "totalForwardedCount": 5,
        "createdAt": "2021-07-23T11:46:53.855Z"
    },
    {
        "outletName": "LUCKY TRADERS",
        "ownerName": "SHUBHAM KUMAR",
        "emailId": "luckytradersshubham@gmail.com",
        "phone": "+919821494856",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-25T16:36:23.597Z"
    },
    {
        "outletName": "JAY MAA PARWATI ENTERPRISES",
        "ownerName": "ANJANI KUMARI",
        "emailId": "jaymaaparwatienterprises@gmail.com",
        "phone": "+919304577462",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Under Review",
        "underRole": "Regional Sales Admin",
        "adminEmail": "lipaguha@britindia.com",
        "priority": 4,
        "totalForwardedCount": 3,
        "createdAt": "2021-07-26T06:52:50.515Z"
    },
    {
        "outletName": "Narvaria Agency",
        "ownerName": "MUKESH KUMAR NARWARIA",
        "emailId": "manishnarwaria26@gmail.com",
        "phone": "+919829999854",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Under Review",
        "underRole": "RCLSM",
        "adminEmail": "rupeshsaini@britindia.com",
        "priority": 10,
        "totalForwardedCount": 7,
        "createdAt": "2021-07-28T04:34:13.997Z"
    },
    {
        "outletName": "ABHISHEK TRADERS",
        "ownerName": "KRISHNA MOHAN GUPTA",
        "emailId": "nigamprovision2013@gmail.com",
        "phone": "+919935531585",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Under Review",
        "underRole": "ASM",
        "adminEmail": "rananjaip@britindia.com",
        "priority": 2,
        "totalForwardedCount": 1,
        "createdAt": "2021-07-28T09:12:28.436Z"
    },
    {
        "outletName": "BHAGAT SALES",
        "ownerName": "Nand lal",
        "emailId": "bhagatsalsekhairthal@gmail.com",
        "phone": "+919414791455",
        "regionName": "NORTH",
        "stateCode": "08",
        "applicationStatus": "Approved",
        "isAwCodeGenerated": true,
        "isEsignInitiatedByDistributor": false,
        "eSignLevel": 0,
        "createdAt": "2021-07-28T12:37:14.369Z"
    },
    {
        "outletName": "DINESH SARRAF AND SONS",
        "ownerName": "CHITRA SARAF",
        "emailId": "akemdp@gmail.com",
        "phone": "+918002478755",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-29T08:06:18.454Z"
    },
    {
        "outletName": "NITINKUMAR MUKUNDRAI",
        "ownerName": "nitinkumar mukundrai desai",
        "emailId": "nitinbhaidesai@yahoo.co.in",
        "phone": "+919898552092",
        "regionName": "WEST",
        "stateCode": "24",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-29T13:07:06.798Z"
    },
    {
        "outletName": "BHOLE GANESH ENTERPRISES",
        "ownerName": "CHANDRA SHEKHAR",
        "emailId": "immunoshekhar@gmail.com",
        "phone": "+917008003008",
        "regionName": "EAST",
        "stateCode": "21",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-29T19:30:10.525Z"
    },
    {
        "outletName": "SUSHIL KIRANA & GENERAL STORE",
        "ownerName": "SUSHEEL PRASAD GUPTA",
        "emailId": "ranjan2017gupta@gmail.com",
        "phone": "+916206186990",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-30T04:43:07.761Z"
    },
    {
        "outletName": "RAJDHANI SALES CORPORATION",
        "ownerName": "DHANANJAY GUPTA",
        "emailId": "rajdhanisalesco@gmail.com",
        "phone": "+919911091856",
        "regionName": "NORTH",
        "stateCode": "07",
        "applicationStatus": "Under Review",
        "underRole": "RSM",
        "adminEmail": "shantanug@britindia.com",
        "priority": 9,
        "totalForwardedCount": 6,
        "createdAt": "2021-07-30T05:41:49.567Z"
    },
    {
        "outletName": "SHIV SWEET CORNER",
        "ownerName": "HARSH GARG",
        "emailId": "harsh_garg07@yahoo.com",
        "phone": "+919826949950",
        "regionName": "WEST",
        "stateCode": "23",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-07-30T08:10:19.053Z"
    },
    {
        "outletName": "M/S BANKA AGENCY",
        "ownerName": "SHURESH KUMAR VANKA",
        "emailId": "bankaagencydss@rediffmail.com",
        "phone": "+917870606862",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 9,
        "createdAt": "2021-07-31T10:16:46.665Z"
    },
    {
        "outletName": "AISHA ENTERPRISES",
        "ownerName": "SUNIL KUMAR SAW",
        "emailId": "sunil151016@gmail.com",
        "phone": "+919934151016",
        "regionName": "CENTRALEAST",
        "stateCode": "20",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-03T08:40:05.792Z"
    },
    {
        "outletName": "SHREE BALAJI AGENCY",
        "ownerName": "CHHOTU LAL SHARMA",
        "emailId": "chhotulalsharma9166@gmail.com",
        "phone": "+919166089038",
        "regionName": "NORTH",
        "stateCode": "08",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-03T12:16:24.247Z"
    },
    {
        "outletName": "N P TRADEZONE LLP",
        "ownerName": "RAHUL PATHAK",
        "emailId": "rahulpathaktundla@gmail.com",
        "phone": "+919837321810",
        "regionName": "NORTH",
        "stateCode": "09",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-03T15:30:33.880Z"
    },
    {
        "outletName": "BITTU JI ENTERPRISES",
        "ownerName": "DIVYANSHU SRIVASTAVA",
        "emailId": "bittukumarbbu@gmail.com",
        "phone": "+918969726242",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-04T07:45:29.675Z"
    },
    {
        "outletName": "GUPTA AGENCIES",
        "ownerName": "Ritu",
        "emailId": "guptaagencies644@gmail.com",
        "phone": "+919216444596",
        "regionName": "NORTH",
        "stateCode": "03",
        "applicationStatus": "Under Review",
        "underRole": "Regional Commercial",
        "adminEmail": "vpopli@britindia.com",
        "priority": 7,
        "totalForwardedCount": 5,
        "createdAt": "2021-08-04T08:37:46.160Z"
    },
    {
        "outletName": "AKSH TRADERS",
        "ownerName": "Abhilekh arora",
        "emailId": "abhi1985arora@gmail.com",
        "phone": "+919829462560",
        "regionName": "NORTH",
        "stateCode": "08",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-04T09:20:21.465Z"
    },
    {
        "outletName": "ANAND MANGAL",
        "ownerName": "PUSHPA DEVI",
        "emailId": "anandhll@rediffmail.com",
        "phone": "+919329312341",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 8,
        "createdAt": "2021-08-04T10:58:56.162Z"
    },
    {
        "outletName": "Matarani",
        "ownerName": "KRISHNA KUMAR",
        "emailId": "mataranid225@gmail.com",
        "phone": "+919212561899",
        "regionName": "NORTH",
        "stateCode": "07",
        "applicationStatus": "Under Review",
        "underRole": "RSM",
        "adminEmail": "shantanug@britindia.com",
        "priority": 9,
        "totalForwardedCount": 6,
        "createdAt": "2021-08-04T11:02:14.527Z"
    },
    {
        "outletName": "VAP ORGANIC FARMS",
        "ownerName": "SARYUG KUMAR",
        "emailId": "vaporganicfarms@yahoo.com",
        "phone": "+919334289869",
        "regionName": "CENTRALEAST",
        "stateCode": "20",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-04T15:00:52.665Z"
    },
    {
        "outletName": "SHREE BHAKTI ENTERPRISES",
        "ownerName": "Mohan Chinnasamy",
        "emailId": "mohansasireka@gmail.com",
        "phone": "+919677922963",
        "regionName": "WEST",
        "stateCode": "27",
        "applicationStatus": "Under Review",
        "underRole": "ASM",
        "adminEmail": "testasm@britindia.com",
        "priority": 2,
        "totalForwardedCount": 1,
        "createdAt": "2021-08-04T15:08:32.460Z"
    },
    {
        "outletName": "TIRUPATI TRADERS",
        "ownerName": "SATYAPRAKESH GUPTA",
        "emailId": "tirupatitraders.morena@rediffmail.com",
        "phone": "+919981671141",
        "regionName": "WEST",
        "stateCode": "23",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 7,
        "createdAt": "2021-08-05T07:27:04.664Z"
    },
    {
        "outletName": "M/S MUKTA ENTERPRISES",
        "ownerName": "MUKTA TAYAL",
        "emailId": "girish_muktaenterprises@yahoo.co.in",
        "phone": "+919810466737",
        "regionName": "NORTH",
        "stateCode": "09",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 8,
        "createdAt": "2021-08-05T07:42:45.845Z"
    },
    {
        "outletName": "PP SALES",
        "ownerName": "Gaurav Kumar",
        "emailId": "ppsales.hjp@gmail.com",
        "phone": "+918983927998",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-05T07:49:36.093Z"
    },
    {
        "outletName": "JAI GURUDEV TRADERS",
        "ownerName": "SHUBHA SINGH",
        "emailId": "jaigurudevtradersbanda@gmail.com",
        "phone": "+917007207353",
        "regionName": "NORTH",
        "stateCode": "09",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-05T08:38:27.004Z"
    },
    {
        "outletName": "M/S KIRAN ENTERPRISERS",
        "ownerName": "PABAN KUMAR BATHUAL",
        "emailId": "kiran.paban2021@gmail.com",
        "phone": "+918637284849",
        "regionName": "EAST",
        "stateCode": "21",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-05T09:17:14.966Z"
    },
    {
        "outletName": "Naam Marketing Experts",
        "ownerName": "SANKAR JAGANATHAN",
        "emailId": "naamexperts@gmail.com",
        "phone": "+919500041113",
        "regionName": "SOUTH2",
        "stateCode": "33",
        "applicationStatus": "Under Review",
        "underRole": "MDM",
        "adminEmail": "mdm@britindia.com",
        "priority": 11,
        "totalForwardedCount": 9,
        "createdAt": "2021-08-05T10:21:40.437Z"
    },
    {
        "outletName": "SHREYAS MARKETING",
        "ownerName": "S N HRITHIK",
        "emailId": "hrithikbpet@rediffmail.com",
        "phone": "+919591442991",
        "regionName": "SOUTH1",
        "stateCode": "29",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-05T11:46:03.076Z"
    },
    {
        "outletName": "A6 VENTURES",
        "ownerName": "ANKITA KATYAL",
        "emailId": "venturesa6@gmail.com",
        "phone": "+917388896777",
        "regionName": "NORTH",
        "stateCode": "09",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-06T07:29:24.541Z"
    },
    {
        "outletName": "D.S. PATEL AND COMPANY",
        "ownerName": "Patel Ishwarlal Jethabhai",
        "emailId": "dspatel_co@yahoo.co.in",
        "phone": "+919825547505",
        "regionName": "WEST",
        "stateCode": "24",
        "applicationStatus": "Under Review",
        "underRole": "ASM",
        "adminEmail": "milankumarr@britindia.com",
        "priority": 2,
        "totalForwardedCount": 1,
        "createdAt": "2021-08-06T10:43:46.297Z"
    },
    {
        "outletName": "TAPASHVI ENTERPRISE",
        "ownerName": "Makwana Rohitbhai Rameshbhai",
        "emailId": "tapshvienterprise@gmail.com",
        "phone": "+918140740713",
        "regionName": "WEST",
        "stateCode": "24",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-06T12:31:12.002Z"
    },
    {
        "outletName": "SRI KAMESWARA COMMUNICATIONS",
        "ownerName": "DHARMA RAO DASUMUKHA",
        "emailId": "dharma.gagan@gmail.com",
        "phone": "+919247841788",
        "regionName": "",
        "stateCode": "37",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "6082d2cb8eee954e340aa717",
            "firstName": "Manmeet Singh",
            "lastName": "Sachdeva",
            "email": "manmeets@britindia.com",
            "phone": "9665049200",
            "password": "$2b$10$9xwSGV3NjkgIBF8r8M9NLOyw3IfN3.A..90Bb/Z0mbOrlcreaiiR.",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "4a0e4fe9-255a-430b-8624-0337beff4f6a",
            "name": "Manmeet Singh Sachdeva",
            "createdAt": "2021-04-23T13:59:40.240Z",
            "updatedAt": "2021-08-09T10:26:29.842Z",
            "__v": 0
        },
        "createdAt": "2021-08-07T00:14:58.219Z"
    },
    {
        "outletName": "Kottayam Business Associates Private Limited",
        "ownerName": "ARUN JOSEPH KOTTARAM",
        "emailId": "arunj@kottaram.in",
        "phone": "+919846210315",
        "regionName": "",
        "stateCode": "32",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "6082d2fa8eee954e340aa718",
            "firstName": "Sunish",
            "lastName": "Cherian",
            "email": "sunishzc@britindia.com",
            "phone": "9047706448",
            "password": "$2b$10$UHW/9ckvJU4DABmCw6xyuu2Wu98Oa93186ni7Meh1DewLiNbTPTmm",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "9cfd1293-fed6-49cc-95a4-24d9664bca64",
            "name": "Sunish Cherian",
            "createdAt": "2021-04-23T14:00:26.975Z",
            "updatedAt": "2021-08-06T07:04:38.398Z",
            "__v": 0
        },
        "createdAt": "2021-08-07T09:56:33.461Z"
    },
    {
        "outletName": "Shreya Enterprises",
        "ownerName": "PAWANESH KUMAR MISHRA",
        "emailId": "sn_mishra1972@rediffmail.com",
        "phone": "+919696737345",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-07T12:48:52.337Z"
    },
    {
        "outletName": "MUTHU ENTERPRISES",
        "ownerName": "RAMANATHAN MUTHUKARUPAN",
        "emailId": "ramanathan.mr@gmail.com",
        "phone": "+919994021219",
        "regionName": "SOUTH2",
        "stateCode": "33",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-09T08:35:27.392Z"
    },
    {
        "outletName": "SHRI PADMA BISCUITS",
        "ownerName": "SHRUTI Bennur",
        "emailId": "shripadmabiscuits@gmail.com",
        "phone": "+919480534800",
        "regionName": "SOUTH1",
        "stateCode": "29",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "6082d2cb8eee954e340aa717",
            "firstName": "Manmeet Singh",
            "lastName": "Sachdeva",
            "email": "manmeets@britindia.com",
            "phone": "9665049200",
            "password": "$2b$10$9xwSGV3NjkgIBF8r8M9NLOyw3IfN3.A..90Bb/Z0mbOrlcreaiiR.",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "4a0e4fe9-255a-430b-8624-0337beff4f6a",
            "name": "Manmeet Singh Sachdeva",
            "createdAt": "2021-04-23T13:59:40.240Z",
            "updatedAt": "2021-08-09T10:26:29.842Z",
            "__v": 0
        },
        "createdAt": "2021-08-09T14:48:01.061Z"
    },
    {
        "outletName": "ELITE MARKETING",
        "ownerName": "PIYUSH BHARDWAJ",
        "emailId": "piyushbhardwaj1987@gmail.com",
        "phone": "+919761878749",
        "regionName": "NORTH",
        "stateCode": "09",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "60f1430a1f678de34f929eee",
            "firstName": "Sudeep",
            "lastName": "Verma",
            "email": "sudeepv@britindia.com",
            "phone": "9765498757",
            "password": "$2b$10$6hAAjLtWNF4OKyfvhoENIupDfcMvKqvPzhXDKZhqtcIadjJchyTnW",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "e63f7ace-b415-4303-9b3a-0b9fe23df7fb",
            "name": "Sudeep Verma",
            "createdAt": "2021-07-16T08:27:54.207Z",
            "updatedAt": "2021-08-09T03:24:48.949Z",
            "__v": 0
        },
        "createdAt": "2021-08-10T11:30:59.898Z"
    },
    {
        "outletName": "MITTAL TRADING COMPANY",
        "ownerName": "HANS KUMAR MITTAL",
        "emailId": "mittalhanskumar@gmail.com",
        "phone": "+917457833459",
        "regionName": "NORTH",
        "stateCode": "09",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "60f1430a1f678de34f929eee",
            "firstName": "Sudeep",
            "lastName": "Verma",
            "email": "sudeepv@britindia.com",
            "phone": "9765498757",
            "password": "$2b$10$6hAAjLtWNF4OKyfvhoENIupDfcMvKqvPzhXDKZhqtcIadjJchyTnW",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "e63f7ace-b415-4303-9b3a-0b9fe23df7fb",
            "name": "Sudeep Verma",
            "createdAt": "2021-07-16T08:27:54.207Z",
            "updatedAt": "2021-08-09T03:24:48.949Z",
            "__v": 0
        },
        "createdAt": "2021-08-10T12:56:31.102Z"
    },
    {
        "outletName": "JEET BROTHERS",
        "ownerName": "INDRAJEET KUMAR GUPTA",
        "emailId": "mailjeetbrothers@gmail.com",
        "phone": "+919934940591",
        "regionName": "CENTRALEAST",
        "stateCode": "10",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-11T10:17:22.885Z"
    },
    {
        "outletName": "MITTAL TRADING CO.",
        "ownerName": "SANJEEV MITTAL",
        "emailId": "mittaltrading@hotmail.com",
        "phone": "+919811748357",
        "regionName": "NORTH",
        "stateCode": "06",
        "underRSMReview": false,
        "applicationStatus": "InProgress",
        "adminInfo": {},
        "createdAt": "2021-08-11T11:03:19.985Z"
    },
    {
        "outletName": "JOTHI AGENCY",
        "ownerName": "MEGAVARNAM KUDALINGAM",
        "emailId": "megavarnam640@gmail.com",
        "phone": "+919025685947",
        "regionName": "SOUTH2",
        "stateCode": "33",
        "underRSMReview": true,
        "applicationStatus": "InProgress",
        "adminInfo": {
            "role": [
                "607464e9c8a55d26c18d9a73"
            ],
            "_id": "6082d2fa8eee954e340aa718",
            "firstName": "Sunish",
            "lastName": "Cherian",
            "email": "sunishzc@britindia.com",
            "phone": "9047706448",
            "password": "$2b$10$UHW/9ckvJU4DABmCw6xyuu2Wu98Oa93186ni7Meh1DewLiNbTPTmm",
            "organization": "607463a0c8a55d26c18d9a69",
            "userId": "9cfd1293-fed6-49cc-95a4-24d9664bca64",
            "name": "Sunish Cherian",
            "createdAt": "2021-04-23T14:00:26.975Z",
            "updatedAt": "2021-08-06T07:04:38.398Z",
            "__v": 0
        },
        "createdAt": "2021-08-11T12:35:35.296Z"
    }
]

const getApplicationGroupByOnboardingStatus = (data) => _.chain(data).groupBy("applicationStatus").map(function (individualInfo, onboardingStatus) {
    return {
        [`${onboardingStatus}`.replace(' ', '_')]: individualInfo,
    }
}).value();

const getGroupEsignApplications = (data) => {

    return _.chain(data).groupBy("eSignLevel").map(function (individualInfo, eSignLevel) {
        return {
            [`LEVEL_${eSignLevel}`]: individualInfo,
        }
    }).value();

}

const getFormattedApplicationList = (data) => {

    let updatedInfo = {};

    for (let item of data) { 
        updatedInfo = { ...updatedInfo, ...item };
    }

    return updatedInfo
}

const getCountBasedOnKey = (data) => {

    let result = [];

    const listOfKeys = Object.keys(data);

    for (let item of listOfKeys) {

        result.push({
            regionName: item,
            totalCount: _.size(data[item]),
            applicationList : data[item]
        })
    }

    return result;
}

const getApplicationGroupedByRegion = (data) => {

    return _.chain(data).groupBy("regionName").map(function (individualInfo, regionName) {
        return {
            [`${regionName}`.replace(' ', '_')]: individualInfo
        }
    }).value();

}

const getApplicationGroupedByRole = (data) => {

    return _.chain(data).groupBy("underRole").map(function (individualInfo, underRole) {
        return {
            [`${underRole}`]: individualInfo
        }
    }).value();

}

const getApplicationWithInProgressStatus = (applicationInProgress) => {

    let applicationWithDistributor = getApplicationGroupedByRegion(applicationInProgress);


    let updatedApplicationsWithDistributor = getFormattedApplicationList(applicationWithDistributor);

    let finalApplicationList = getCountBasedOnKey(updatedApplicationsWithDistributor);


    return {
        totalCount: _.size(applicationInProgress),
        finalApplicationList
    }
}

const getApplicationWithApprovalStatus = (applicationApprovedList) => {

    let approvedApplicationList = getApplicationGroupedByRegion(applicationApprovedList);

    let applicationWithApprovalStatus = getFormattedApplicationList(approvedApplicationList);

    let finalApplicationWithStatusApproved = getCountBasedOnKey(applicationWithApprovalStatus);

    return {
        totalCount: _.size(applicationApprovedList),
        finalApplicationList: finalApplicationWithStatusApproved
    }
}

const getApplicationsE_signStatus = (applicationApprovedList = []) => {

    let eSignApplicationList = applicationApprovedList.filter((item) => item.isEsignInitiatedByDistributor);

    let groupedEsignLevel = getGroupEsignApplications(eSignApplicationList);

    const { LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3 } = getFormattedApplicationList(groupedEsignLevel);

    return {
        totalApplicationCount: _.size(eSignApplicationList),
        applicationNotInitiatedByDb: {
            totalCount: _.size(LEVEL_0),
            applications: LEVEL_0
        },
        applicationInitiatedByDb: {
            totalCount: _.size(LEVEL_1),
            applications: LEVEL_1
        },
        applicationInitiatedByAdmin1: {
            totalCount: _.size(LEVEL_2),
            applications: LEVEL_2
        },
        applicationInitiatedByAdmin2: {
            totalCount: _.size(LEVEL_3),
            applications: LEVEL_3
        }
    }
}

const getApplicationWithUnderApprovalStage = (applicationUnderReview) => {

    let applicationWithAdmin = getApplicationGroupedByRole(applicationUnderReview);

    let updatedApplicationsWithAdmin = getFormattedApplicationList(applicationWithAdmin);

    const getRolesList = Object.keys(updatedApplicationsWithAdmin);

    let pendingApplications = []

    for (let item of getRolesList) {

        let applicationWithAdmin = getApplicationGroupedByRegion(updatedApplicationsWithAdmin[item]);

        let formattedApplicationList = getFormattedApplicationList(applicationWithAdmin);

        let roleBasedApplications = getCountBasedOnKey(formattedApplicationList) /*?*/

        pendingApplications.push({
            roleName: item,
            totalApplicationCount: _.size(updatedApplicationsWithAdmin[item]),
            applicationDetails: roleBasedApplications
        })
    }

    return {
        totalCount: _.size(applicationUnderReview),
        finalApplicationList: pendingApplications
    }

}

const getApplicationOnboardingInfo = (data) => {

    const applicationGroupByOnboardingStatus = getApplicationGroupByOnboardingStatus(data);

    const updatedApplicationList = getFormattedApplicationList(applicationGroupByOnboardingStatus);

    const {
        Approved: applicationApprovedList = [],
        InProgress: applicationInProgress = [],
        Rejected: applicationRejected = [],
        Under_Review: applicationUnderReview = []
    } = updatedApplicationList || {};

    // application with distributors classifying based on region

    const applicationWithDb = getApplicationWithInProgressStatus(applicationInProgress)

    // application with admin classifying based on Role

    const applicationUnderAdminReview = getApplicationWithUnderApprovalStage(applicationUnderReview)

    // application with approved status classifying based on region

    const applicationWithApprovalStatus = getApplicationWithApprovalStatus(applicationApprovedList);

    //  application for the e-sign approval status
    const applicationStatusWithEsign = getApplicationsE_signStatus(applicationApprovedList)


    return {
        applicationWithDb,
        applicationUnderAdminReview,
        applicationWithApprovalStatus,
        applicationStatusWithEsign,
    }
}



let totalInfo = getApplicationOnboardingInfo(data);


console.log(JSON.stringify(totalInfo));