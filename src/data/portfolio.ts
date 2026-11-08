import {
    SiDatabricks, SiSnowflake,
    SiOracle, SiApachespark, SiPython, SiCoursera
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaBuilding, FaCode, FaDatabase, FaCogs } from "react-icons/fa";

export const experience = [
    {
        company: "Cedar Gate Services Pvt. Ltd.",
        role: "Principal Data Engineer",
        location: "Lalitpur, Nepal",
        period: "Sep 2024 – Present",
        description: "Directing high-throughput data ingestion, warehouse modeling, and governance frameworks for mission-critical enterprise US healthcare analytics.",
        highlights: [
            "Ingested and processed large-scale clinical datasets from diverse healthcare providers into a centralized AWS Redshift warehouse for executive analytics.",
            "Developed PySpark-based ingestion optimizations, increasing healthcare data throughput by 30% and significantly cutting compute costs.",
            "Architected data infrastructure using advanced SQL, stored procedures, and custom UDFs to enable rapid exploration and sub-second analytics.",
            "Implemented enterprise data governance and automated validation benchmarks aligned with strict US healthcare standards (HIPAA).",
            "Mentored engineering squads on modern lakehouse design patterns, schema contracts, and scalable data models."
        ]
    },
    {
        company: "Techkraft Inc. Pvt. Ltd.",
        role: "Senior Software (Data) Engineer | Lead",
        location: "Lalitpur, Nepal",
        period: "Oct 2022 – May 2024",
        description: "Led the migration of legacy data infrastructure to Databricks + Delta Lake while managing engineering delivery and SLA compliance.",
        highlights: [
            "Awarded 'Best Employee Award 2023' in recognition of outstanding technical leadership and on-time project delivery.",
            "Managed and mentored an 8-member engineering squad, driving agile sprint execution, code quality, and 99.9% SLA adherence.",
            "Led the migration of legacy ETL workflows to Databricks + Delta Lake, improving overall processing scalability by 40%.",
            "Designed a reusable PySpark data quality framework capable of parsing complex structured and semi-structured payloads with automated anomaly detection.",
            "Conducted data quality assessments to ensure rigorous accuracy and completeness across enterprise data assets."
        ]
    },
    {
        company: "Cotiviti Nepal Ltd.",
        role: "Software (Data) Engineer",
        location: "Kathmandu, Nepal",
        period: "Mar 2018 – Oct 2022",
        description: "Engineered and maintained high-throughput ETL workflows for US healthcare claims lifecycle and payment integrity.",
        highlights: [
            "Developed and maintained mission-critical ETL workflows (ODI, Oracle SQL, Python) processing millions of healthcare claims.",
            "Optimized complex SQL execution plans, slashing executive report generation time by 35% and improving operational efficiency.",
            "Automated manual reconciliation processes, dramatically increasing data delivery throughput and eliminating human errors.",
            "Collaborated with business analysts to translate clinical business requirements into scalable, fault-tolerant pipelines."
        ]
    },
    {
        company: "I.M.S. Investment Management Service",
        role: "Software Engineer (PHP Developer)",
        location: "Kathmandu, Nepal",
        period: "Dec 2017 – Mar 2018",
        description: "Backend data integration and database optimization for financial investment tracking systems.",
        highlights: [
            "Built backend integration modules in PHP (Laravel) and MySQL for investment tracking systems.",
            "Optimized database performance via query tuning, indexing, and cached retrieval strategies."
        ]
    },
    {
        company: "Cotiviti Nepal Ltd.",
        role: "Trainee Data Engineer",
        location: "Kathmandu, Nepal",
        period: "Dec 2016 – May 2017",
        description: "Foundational ETL workflows, healthcare data profiling, and validation for analytics readiness.",
        highlights: [
            "Gained foundational knowledge in ETL workflows and Oracle SQL for healthcare data pipelines.",
            "Executed data profiling and schema validation tasks to ensure clinical data readiness for analytics."
        ]
    }
];

export const personalInfo = {
    name: "Sabrin Lal Singh",
    title: "Lead Data Engineer & QA Engineer · Data Lead / Manager",
    roles: [
        "Data Manager",
        "Data Lead",
        "Lead Data Engineer",
        "Lead Data QA Engineer",
        "Analytics Delivery Manager"
    ],
    email: "sabrinlalsingh@gmail.com",
    location: "Kathmandu, Nepal",
    summary: `Strategic Lead Data & QA Engineer and Data Delivery Manager with 9+ years directing petabyte-scale data infrastructure and high-performing engineering squads. Specializing in Databricks, Delta Lake, Snowflake, and AWS ecosystems, I bridge technical execution with business strategy—delivering high-fidelity, HIPAA-compliant data products and automated zero-defect validation gates.`,
    social: {
        github: "https://github.com/sabrinsingh",
        linkedin: "https://linkedin.com/in/sabrin-lal-singh-478218a0",
        upwork: "https://www.upwork.com/freelancers/~019c63b7c8441f7142"
    }
};

export const projects = [
    {
        id: 1,
        title: "Clinical Data Orchestration",
        category: "databricks",
        description:
            "Architected a scalable Medallion lakehouse processing 50M+ daily records, driving a 95% reduction in systemic data anomalies.",
        technologies: ["Databricks", "Delta Lake", "PySpark", "Python"],
        impact: "Reliable Clinical Ingestion",
        metrics: "50M+ Daily Load"
    },
    {
        id: 2,
        title: "Redshift Analytics Framework",
        category: "aws",
        description:
            "Engineered a centralized, high-performance warehouse architecture integrating 20+ sources, slashing query latency by 35%.",
        technologies: ["AWS Redshift", "S3", "AWS Glue", "Advanced SQL"],
        impact: "Strategic Decision Layer",
        metrics: "Sub-Second Response"
    },
    {
        id: 3,
        title: "Healthcare Data QA & Claims Reconciliation",
        category: "healthcare-qa",
        description:
            "Automated claims reconciliation and data quality verification engine using SQL stored procedures, catching discrepancies across 500K+ daily healthcare records.",
        technologies: ["Advanced SQL", "Stored Procedures", "PostgreSQL", "AWS Redshift", "HIPAA QA"],
        impact: "Zero Claim Discrepancies",
        metrics: "100% Claim Integrity"
    },
];

export const skills = [
    {
        category: "Data Engineering & Lakehouses",
        icon: FaDatabase,
        items: ["ETL/ELT Design", "Data Modeling", "Databricks Workflows", "Delta Lake", "Snowflake", "Apache Spark (PySpark)"]
    },
    {
        category: "Cloud Platforms & Warehousing",
        icon: FaBuilding,
        items: ["AWS (S3, Redshift, Glue)", "Azure Databricks", "Data Warehousing", "Performance & Cost Tuning"]
    },
    {
        category: "Languages & Frameworks",
        icon: FaCode,
        items: ["Python (PySpark, Pandas)", "SQL (Redshift, PostgreSQL, Oracle)", "Stored Procedures & UDFs", "Git", "CI/CD Data Gates"]
    },
    {
        category: "Data Quality & Automated QA",
        icon: FaCogs,
        items: ["Automated Validation Gates", "SQL Test Suites", "Claims Reconciliation", "Anomaly Detection Scripts", "Data Profiling", "Zero-Drift Sentinels"]
    },
    {
        category: "Healthcare Domain & Governance",
        icon: FaBuilding,
        items: ["HIPAA Compliance", "Claims Lifecycle", "Encounter Data", "Data Governance Benchmarks", "HL7 / FHIR Feeds"]
    }
];

export const certifications = [
    {
        name: "Databricks Certified Data Engineer Professional",
        issuer: "Databricks",
        year: "2024",
        icon: SiDatabricks
    },
    {
        name: "Databricks Certified Associate Developer for Apache Spark",
        issuer: "Databricks",
        year: "2023",
        icon: SiApachespark
    },
    {
        name: "Microsoft Azure Data Fundamentals (DP-900)",
        issuer: "Microsoft",
        year: "2023",
        icon: VscAzure
    },
    {
        name: "Data Engineering Foundations Specialization",
        issuer: "IBM",
        year: "2024",
        icon: FaBuilding
    },
    {
        name: "Databases and SQL for Data Science with Python",
        issuer: "IBM",
        year: "2024",
        icon: SiPython
    },
    {
        name: "Snowflake SnowPro Core Certification",
        issuer: "Snowflake",
        year: "2022",
        icon: SiSnowflake
    },
    {
        name: "Generative AI Fundamentals",
        issuer: "Databricks",
        year: "2024",
        icon: SiDatabricks
    },
    {
        name: "Oracle Certified Professional: Java SE 11 Developer",
        issuer: "Oracle",
        year: "2021",
        icon: SiOracle
    },
    {
        name: "Apache Spark 3 Fundamentals with Scala",
        issuer: "Databricks",
        year: "2023",
        icon: SiApachespark
    },
    {
        name: "Python for Data Science, AI & Development",
        issuer: "IBM",
        year: "2022",
        icon: SiPython
    },
    {
        name: "ETL and Data Pipelines with Shell & Kafka",
        issuer: "IBM",
        year: "2024",
        icon: FaBuilding
    },
    {
        name: "Big Data with PySpark",
        issuer: "Coursera",
        year: "2022",
        icon: SiCoursera
    }
];

export const recommendations = [
    {
        id: 1,
        text: "I've had the pleasure of working alongside Sabrin Lal Singh at TechkraftInc... he's one of those rare professionals who truly makes everyone around him better. What strikes me most about Sabrin is his integrity... As a mentor, Sabrin is outstanding... He's not just technically excellent he's the kind of person who makes the whole team stronger just by being part of it.",
        author: "Paras Gautam",
        role: "Senior Data Engineer",
        relation: "Colleague",
        company: "TechkraftInc"
    },
    {
        id: 2,
        text: "Sabrin demonstrated strong technical skills by automating testing scripts using SQL, Python, Pandas, and AWS Redshift... Beyond his technical strengths, he was a supportive team player—mentoring junior members and consistently advocating for best practices in data quality across the team.",
        author: "Silu Pandit",
        role: "Data Analytics Analyst",
        relation: "Colleague",
        company: "Cedar Gate Services Pvt. Ltd."
    }
];

export const education = [
    {
        degree: "Master of Business Administration (MBA)",
        institution: "KFA Business School (Lincoln University)",
        location: "Kathmandu, Nepal",
        period: "Completed",
        gpa: "3.78 GPA",
        highlights: "Strategic Management, Leadership, Operations, and Business Analytics."
    },
    {
        degree: "Bachelor’s in Computer Engineering",
        institution: "Kathford International College of Engineering and Management (Tribhuvan University)",
        location: "Lalitpur, Nepal",
        period: "2012 – 2016",
        highlights: "Core engineering foundation in algorithms, database design, distributed systems, and computer networks."
    },
    {
        degree: "+2 Science (Higher Secondary)",
        institution: "Xavier International College",
        location: "Kathmandu, Nepal",
        period: "2010 – 2012",
        highlights: "Mathematics and Physics focus."
    }
];

export const awards = [
    {
        title: "Best Employee Award 2023",
        organization: "Techkraft Inc. Pvt. Ltd.",
        year: "2023",
        description: "Awarded for exceptional engineering leadership, mentorship, and on-time migration of enterprise data infrastructure to Databricks Lakehouse."
    }
];
