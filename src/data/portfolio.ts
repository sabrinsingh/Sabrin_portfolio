import {
    SiDatabricks, SiSnowflake,
    SiOracle, SiApachespark, SiPython, SiCoursera
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaBuilding, FaCode, FaDatabase, FaCogs } from "react-icons/fa";

export const careerStartDate = "2017-10-01";

export const calculateYearsOfExperience = () => {
    const start = new Date(careerStartDate);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
};

const yearsOfExp = calculateYearsOfExperience();

export const personalInfo = {
    name: "Sabrin Lal Singh",
    title: "Data Analytics Engineer",
    email: "sabrinlalsingh@gmail.com",
    location: "Kathmandu, Nepal",
    summary: `Data Analytics Engineer with ${yearsOfExp}+ years of experience specialized in building high-throughput, resilient data systems. Expert in AWS and Databricks ecosystems, with a track record of delivering high-fidelity data products for the US healthcare sector.`,
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
            "Architected a Medallion-based lakehouse processing 50M+ daily records with 95% reduction in data anomalies.",
        technologies: ["Databricks", "Delta Lake", "PySpark", "Python"],
        impact: "Reliable Clinical Ingestion",
        metrics: "50M+ Daily Load"
    },
    {
        id: 2,
        title: "Redshift Analytics Framework",
        category: "aws",
        description:
            "Engineered a centralized warehouse architecture for 20+ sources, optimizing query latency by 35%.",
        technologies: ["AWS Redshift", "S3", "Airflow", "SQL"],
        impact: "Strategic Decision Layer",
        metrics: "Sub-Second Response"
    },
    {
        id: 6,
        title: "LLM Governance Layer",
        category: "ai",
        description:
            "Implemented PII scrubbing and secure prompt protocols for AI operations in HIPAA-compliant environments.",
        technologies: ["Python", "LLM Orchestration", "Cybersecurity"],
        impact: "Safe AI Adoption",
        metrics: "100% HIPAA Integrity"
    },
];

export const skills = [
    {
        category: "Data Engineering",
        icon: FaDatabase,
        items: ["ETL/ELT Design", "Data Modeling", "Databricks Workflows", "Delta Lake", "Snowflake", "Apache Spark"]
    },
    {
        category: "Cloud & Infrastructure",
        icon: FaBuilding,
        items: ["AWS (S3, Redshift, Glue)", "Azure Databricks", "Cloud Architecture", "Performance Tuning"]
    },
    {
        category: "Languages & Tools",
        icon: FaCode,
        items: ["Python (PySpark, Pandas)", "SQL (Redshift, PostgreSQL, Oracle)", "Git", "Jira", "CI/CD"]
    },
    {
        category: "AI & Data Quality",
        icon: FaCogs,
        items: ["LLM Operations (LLMOps)", "Data Quality Frameworks", "Anomaly Detection", "Automated Validation"]
    }
];

export const experience = [
    {
        company: "Cedar Gate Services Pvt. Ltd.",
        role: "Data Engineer",
        location: "Lalitpur, Nepal",
        period: "Sep 2024 – Present",
        description: "Leading the development of high-scale data ingestion and processing systems for the US healthcare domain.",
        highlights: [
            "Ingested and processed large datasets from diverse sources into a centralized Redshift data warehouse.",
            "Developed PySpark-based ingestion optimization, increasing healthcare data throughput by 30%.",
            "Maintained and optimized data infrastructure using custom SQL, UDFs, and stored procedures in Redshift.",
            "Implemented data governance framework aligned with US healthcare standards and HIPAA.",
            "Mentored junior engineers on best practices in data engineering."
        ]
    },
    {
        company: "CoWrkr",
        role: "Data Engineering Consultant / Advisor",
        location: "Remote, United States",
        period: "May 2024 – Present",
        description: "Strategic advisor for scalable data pipelines and AI data quality frameworks.",
        highlights: [
            "Advise on the design of data quality frameworks supporting enterprise analytics and AI initiatives.",
            "Lead data quality initiatives ensuring consistency and reliability across Dev, Stage, and Prod.",
            "Support LLM QA processes — evaluating model responses and validating prompt accuracy.",
            "Develop and refine LLM prompts to enhance model training efficiency."
        ]
    },
    {
        company: "Techkraft Inc. Pvt. Ltd.",
        role: "Senior Software (Data) Engineer",
        location: "Lalitpur, Nepal",
        period: "Oct 2022 – May 2024",
        description: "Led modernization of data infrastructure and team mentorship.",
        highlights: [
            "Led migration of legacy pipelines to Databricks + Delta Lake, improving scalability by 40%.",
            "Designed reusable data quality framework in PySpark for structured and semi-structured data.",
            "Implemented anomaly detection scripts to proactively flag data integrity issues.",
            "Mentored 8-member team, driving project delivery and SLA adherence."
        ]
    },
    {
        company: "Cotiviti Nepal Ltd.",
        role: "Software (Data) Engineer",
        location: "Kathmandu, Nepal",
        period: "Mar 2018 – Oct 2022",
        description: "Developed ETL workflows for US healthcare claims data.",
        highlights: [
            "Developed and maintained ETL workflows using ODI, Oracle SQL, and Python.",
            "Reduced report generation time by 35% through complex SQL optimization.",
            "Automated manual reconciliation processes, increasing throughput and accuracy.",
            "Progressed from Trainee to Senior role through consistent performance."
        ]
    },
    {
        company: "IMS Investment Management Service",
        role: "Software Engineer (PHP Developer)",
        location: "Kathmandu, Nepal",
        period: "Oct 2017 – Mar 2018",
        description: "Backend development for investment tracking systems.",
        highlights: [
            "Built backend integration modules in PHP/MySQL for investment tracking.",
            "Optimized database performance via query tuning and caching."
        ]
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
        name: "ETL and Data Pipelines with Shell, Airflow & Kafka",
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

export const engineeringPrinciples = [
    {
        title: "Validation as Code",
        description: "Data quality is not an afterthought; it is a primary unit of code. Every pipeline must include autonomous verification gates.",
        icon: "ShieldCheck"
    },
    {
        title: "Failure-First Design",
        description: "Architecting for inevitable failure through idempotent retries, decoupled components, and atomic state management (ACID).",
        icon: "Zap"
    },
    {
        title: "Cost-Optimized Compute",
        description: "Balancing performance with business economics by choosing the right compute gravity for the workload (Serverless vs. Clusters).",
        icon: "Activity"
    }
];
