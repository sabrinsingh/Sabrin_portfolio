import {
    SiDatabricks, SiSnowflake,
    SiOracle, SiApachespark, SiPython, SiCoursera
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaBuilding, FaCode, FaDatabase, FaCogs } from "react-icons/fa";

export const experience = [
    {
        company: "Cedar Gate Services Pvt. Ltd.",
        role: "Data Engineer",
        location: "Lalitpur, Nepal",
        period: "Sep 2024 – Present",
        description: "Architecting high-throughput data ingestion pipelines and resilient processing systems for enterprise healthcare analytics.",
        highlights: [
            "Engineered petabyte-scale data pipelines ingesting diverse healthcare records into a centralized AWS Redshift warehouse.",
            "Optimized PySpark transformation logic, accelerating healthcare data throughput by 30% and significantly reducing compute costs.",
            "Architected robust data infrastructure utilizing advanced SQL, custom UDFs, and stored procedures to ensure strict HIPAA compliance.",
            "Spearheaded data governance initiatives, establishing automated validation gates aligned with US healthcare standards.",
            "Mentored engineering teams on modern lakehouse patterns and scalable architecture design."
        ]
    },
    {
        company: "CoWrkr",
        role: "Data Engineering Consultant / Advisor",
        location: "Remote, United States",
        period: "May 2024 – Present",
        description: "Strategic advisor for scalable data pipelines, AI governance, and enterprise data quality frameworks.",
        highlights: [
            "Advising executive leadership on the strategic design of enterprise-grade data quality frameworks for AI readiness.",
            "Spearheading data reliability initiatives, ensuring 99.9% consistency across Development, Staging, and Production environments.",
            "Architecting LLM QA protocols—rigorously evaluating model responses and validating prompt precision for production deployment.",
            "Refining complex LLM prompts and orchestration logic to maximize model training efficiency and accuracy."
        ]
    },
    {
        company: "Techkraft Inc. Pvt. Ltd.",
        role: "Senior Software (Data) Engineer",
        location: "Lalitpur, Nepal",
        period: "Oct 2022 – May 2024",
        description: "Led the strategic modernization of legacy data infrastructure into a high-performance Databricks Lakehouse.",
        highlights: [
            "Orchestrated the migration of legacy pipelines to a Databricks + Delta Lake architecture, driving a 40% improvement in scalability.",
            "Architected a reusable, resilient PySpark data quality framework capable of parsing complex structured and semi-structured payloads.",
            "Deployed advanced anomaly detection algorithms to proactively flag data integrity risks before downstream consumption.",
            "Directed an 8-member engineering squad, ensuring rigorous SLA adherence and accelerating critical project delivery."
        ]
    },
    {
        company: "Cotiviti Nepal Ltd.",
        role: "Software (Data) Engineer",
        location: "Kathmandu, Nepal",
        period: "Mar 2018 – Oct 2022",
        description: "Engineered high-throughput ETL workflows for critical US healthcare claims intelligence.",
        highlights: [
            "Designed and maintained complex ETL orchestration workflows utilizing ODI, Oracle SQL, and Python.",
            "Achieved a 35% reduction in executive report generation time through advanced SQL execution plan tuning.",
            "Automated legacy manual reconciliation pipelines, radically increasing data throughput and accuracy.",
            "Rapidly promoted from Trainee to Senior role by consistently delivering resilient infrastructure solutions."
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

// Helper to extract year from period string like "Sep 2024 – Present" or "Oct 2017 – Mar 2018"
const getStartYear = (period: string) => {
    const match = period.match(/\d{4}/);
    return match ? parseInt(match[0]) : new Date().getFullYear();
};

export const calculateYearsOfExperience = () => {
    if (!experience || experience.length === 0) return 7; // Fallback
    const startYears = experience.map(exp => getStartYear(exp.period));
    const earliestYear = Math.min(...startYears);
    const currentYear = new Date().getFullYear();
    return currentYear - earliestYear;
};

const yearsOfExp = calculateYearsOfExperience();

export const personalInfo = {
    name: "Sabrin Lal Singh",
    title: "Data Analytics Engineer",
    roles: ["Data Engineer", "Data Quality Engineer", "Data Analytics Engineer Analyst", "Analytics Strategist", "Data Analytics Engineer"],
    email: "sabrinlalsingh@gmail.com",
    location: "Kathmandu, Nepal",
    summary: `Strategic Data Analytics Engineer with ${yearsOfExp}+ years architecting resilient, petabyte-scale data infrastructure. Specializing in the AWS and Databricks ecosystems, I bridge the gap between raw data and executive decision-making—delivering high-fidelity, HIPAA-compliant data products for mission-critical healthcare environments.`,
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
        technologies: ["AWS Redshift", "S3", "Airflow", "SQL"],
        impact: "Strategic Decision Layer",
        metrics: "Sub-Second Response"
    },
    {
        id: 6,
        title: "LLM Governance Layer",
        category: "ai",
        description:
            "Deployed robust PII scrubbing and secure prompt protocols for AI orchestration in highly regulated, HIPAA-compliant environments.",
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

// End of file

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
