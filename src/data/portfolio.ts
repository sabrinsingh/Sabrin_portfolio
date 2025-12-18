import {
    SiDatabricks, SiSnowflake,
    SiOracle, SiApachespark, SiPython, SiCoursera
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaBuilding } from "react-icons/fa";

export const projects = [
    {
        id: 1,
        title: "Real-time Healthcare Data Pipeline",
        category: "databricks",
        description:
            "Built a scalable ETL pipeline processing 50M+ healthcare claims daily using Databricks and Delta Lake. Implemented automated data quality checks reducing errors by 95%.",
        longDescription: "This project involved architecting a real-time data ingestion system for a major healthcare provider. The challenge was to handle high-velocity claims data while ensuring HIPAA compliance and data integrity. \n\nKey features included:\n- Streaming ingestion using Spark Structured Streaming.\n- Delta Lake for ACID transactions and time travel.\n- Automated quality gates using Great Expectations.\n- Real-time dashboards for operational monitoring.",
        technologies: ["Databricks", "Delta Lake", "PySpark", "Python", "SQL"],
        impact: "40% improvement in processing speed",
    },
    {
        id: 2,
        title: "AWS Redshift Data Warehouse",
        category: "aws",
        description:
            "Designed and implemented a centralized data warehouse on AWS Redshift ingesting data from 20+ sources. Optimized queries reducing report generation time by 35%.",
        longDescription: "Consolidated fragmented data silos into a unified Redshift Data Warehouse. This enabled cross-functional analytics and significantly reduced the time to insight for business users.\n\nKey achievements:\n- Designed Star Schema data models for optimized querying.\n- Implemented incremental loading strategies to reduce cost.\n- Set up role-based access control (RBAC) for security.",
        technologies: ["AWS Redshift", "S3", "SQL", "Python", "Airflow"],
        impact: "35% faster reporting",
    },
    {
        id: 3,
        title: "Data Quality Framework",
        category: "quality",
        description:
            "Developed a comprehensive data quality framework using PySpark for structured and semi-structured data validation. Automated reconciliation processes increasing accuracy to 99.9%.",
        longDescription: "Built a reusable library for data quality validation that could be plugged into any ETL pipeline. This framework supported custom rules, anomaly detection, and automated alerting.",
        technologies: ["PySpark", "Python", "DataBricks", "SQL"],
        impact: "99.9% data accuracy",
    },
    {
        id: 4,
        title: "Anomaly Detection System",
        category: "analytics",
        description:
            "Created anomaly detection scripts to proactively identify data integrity issues in healthcare pipelines. Reduced manual investigation time by 60%.",
        longDescription: "Implemented statistical models to detect outliers in claim amounts and processing times. This proactive approach prevented bad data from reaching downstream analytics systems.",
        technologies: ["Python", "Pandas", "Statistical Analysis", "SQL"],
        impact: "60% reduction in investigation time",
    },
    {
        id: 5,
        title: "ETL Workflow Automation",
        category: "automation",
        description:
            "Automated manual reconciliation processes for healthcare claims using Python and Oracle SQL. Increased throughput by 3x while maintaining data accuracy.",
        longDescription: "Replaced legacy manual spreadsheets with fully automated Python scripts orchestrated by Airflow. This eliminated human error and freed up 20 hours per week for the operations team.",
        technologies: ["Python", "Oracle SQL", "ODI"],
        impact: "3x throughput increase",
    },
    {
        id: 6,
        title: "LLM Data Governance System",
        category: "ai",
        description:
            "Implemented data governance framework for LLM operations including data quality validation and prompt engineering. Ensured HIPAA compliance across all data flows.",
        longDescription: "Established the governance layer for a Generative AI initiative. Focused on PII redaction, output validation, and audit logging to ensure safe and compliant use of LLMs in healthcare.",
        technologies: ["Python", "LLM APIs", "Data Governance", "HIPAA"],
        impact: "100% compliance maintained",
    },
];

export const skills = [
    {
        category: "Data Engineering",
        items: [
            "ETL/ELT Design",
            "Data Modeling",
            "Pipeline Orchestration",
            "Data Quality",
        ],
    },
    {
        category: "Big Data & Cloud",
        items: ["Databricks", "Delta Lake", "PySpark", "AWS (S3, Redshift)", "Snowflake"],
    },
    {
        category: "Languages & Tools",
        items: ["Python", "SQL", "PySpark", "Pandas", "Git", "Jira"],
    },
    {
        category: "Specializations",
        items: [
            "Healthcare Data",
            "HIPAA Compliance",
            "Data Governance",
            "LLM Operations",
        ],
    },
];

export const experience = [
    {
        role: "Data Engineering Consultant / Advisor",
        company: "CoWrkr",
        location: "Remote, United States",
        period: "May 2024 – Present",
        highlights: [
            "Design and implement scalable data pipelines for enterprise analytics",
            "Lead data quality initiatives across Dev, Stage, and Prod environments",
            "Support LLM QA processes and prompt engineering",
            "Collaborate with engineers and researchers on data integrity",
        ],
    },
    {
        role: "Principal Data Engineer",
        company: "Cedar Gate Services Pvt. Ltd.",
        location: "Lalitpur, Nepal",
        period: "Sep 2024 – Present",
        highlights: [
            "Ingest and process large datasets into Redshift data warehouse",
            "Develop custom SQL queries and stored procedures",
            "Implement data governance aligned with HIPAA standards",
            "Mentor junior engineers on data engineering best practices",
        ],
    },
    {
        role: "Senior Software (Data) Engineer",
        company: "Techkraft Inc. Pvt. Ltd.",
        location: "Lalitpur, Nepal",
        period: "Oct 2022 – May 2024",
        highlights: [
            "Led migration of legacy pipelines to Databricks + Delta Lake (40% improvement)",
            "Designed reusable data quality framework in PySpark",
            "Implemented anomaly detection for proactive issue flagging",
            "Mentored 8-member team on project delivery",
        ],
    },
    {
        role: "Software (Data) Engineer",
        company: "Cotiviti Nepal Ltd.",
        location: "Kathmandu, Nepal",
        period: "Mar 2018 – Oct 2022",
        highlights: [
            "Developed and maintained ETL workflows for US healthcare claims",
            "Reduced report generation time by 35% through SQL optimization",
            "Automated manual reconciliation processes",
            "Supported data profiling and validation tasks",
        ],
    },
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
        role: "Data Analytics Analyist",
        relation: "Colleague",
        company: "Cedar Gate Services Pvt. Ltd."
    }
];

export const blogPosts = [
    {
        id: 1,
        title: "Optimizing Databricks Workloads for Cost and Performance",
        excerpt: "Learn how to tune your Spark configurations and Delta Lake tables to reduce costs by up to 30% while improving query performance.",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        tags: ["Databricks", "Optimization", "Cost Management"],
        link: "#"
    },
    {
        id: 2,
        title: "Building a Robust Data Quality Framework with PySpark",
        excerpt: "A step-by-step guide to implementing automated data quality checks in your ETL pipelines using PySpark and Great Expectations.",
        date: "Oct 28, 2024",
        readTime: "8 min read",
        tags: ["Data Quality", "PySpark", "ETL"],
        link: "#"
    },
    {
        id: 3,
        title: "Navigating HIPAA Compliance in the Age of LLMs",
        excerpt: "Best practices for data governance, PII redaction, and audit logging when building Generative AI applications in healthcare.",
        date: "Oct 10, 2024",
        readTime: "6 min read",
        tags: ["HIPAA", "LLM", "Data Governance"],
        link: "#"
    }
];
