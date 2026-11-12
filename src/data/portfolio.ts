import {
    SiDatabricks, SiSnowflake,
    SiOracle, SiApachespark, SiPython, SiCoursera
} from "react-icons/si";
import type { IconType } from "react-icons";
import { VscAzure } from "react-icons/vsc";
import { FaBuilding } from "react-icons/fa";

export const experience = [
    {
        company: "Cedar Gate Services Pvt. Ltd.",
        role: "Principal Data Engineer",
        location: "Lalitpur, Nepal",
        period: "Sep 2024 – Present",
        description: "I run high-throughput ingestion, warehouse modeling and governance for US healthcare analytics.",
        highlights: [
            "Ingested and processed large-scale clinical datasets from diverse healthcare providers into a centralized AWS Redshift warehouse for executive analytics.",
            "Maintained and optimized the load logic with custom SQL, user-defined functions and stored procedures in Redshift.",
            "Implemented enterprise data governance and automated validation benchmarks aligned with strict US healthcare standards (HIPAA).",
        ]
    },
    {
        company: "Techkraft Inc. Pvt. Ltd.",
        role: "Senior Software (Data) Engineer | Lead",
        location: "Lalitpur, Nepal",
        period: "Oct 2022 – May 2024",
        description: "Led a four-engineer team that built a reusable PySpark quality framework, with responsibility for delivery and SLA adherence.",
        highlights: [
            "Awarded 'Best Employee Award 2023' in recognition of outstanding technical leadership and on-time project delivery.",
            "Managed and mentored a team of four engineers, delivering projects on time while holding SLA adherence across delivery.",
            "Built a reusable PySpark data quality framework for structured and semi-structured sources.",
            "Implemented automated anomaly detection scripts that flag data issues before publication."
        ]
    },
    {
        company: "Cotiviti Nepal Ltd.",
        role: "Software (Data) Engineer",
        location: "Kathmandu, Nepal",
        period: "Mar 2018 – Oct 2022",
        description: "Engineered and maintained high-throughput ETL workflows for US healthcare claims lifecycle and payment integrity.",
        highlights: [
            "Developed and maintained mission-critical ETL workflows (ODI, Oracle SQL, Python) processing high-volume US healthcare claims.",
            "Rewrote SQL execution plans and cut executive report generation time by 35%.",
            "Automated manual reconciliation, which raised delivery throughput and removed the human errors.",
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
    summary: `Principal data engineer with 9+ years in healthcare data. I work in Redshift, Databricks, PySpark and SQL, and I build the checks that keep HIPAA-regulated claims and clinical data correct before it reaches a report.`,
    social: {
        github: "https://github.com/sabrinsingh",
        linkedin: "https://linkedin.com/in/sabrin-lal-singh-478218a0",
        upwork: "https://www.upwork.com/freelancers/~019c63b7c8441f7142"
    }
};

export const projects = [
    {
        id: 1,
        title: "Clinical Warehouse and Quality Checks",
        category: "aws",
        description:
            "Clinical and claims data into one Redshift warehouse, with SQL checks that hold a batch before it reaches reporting.",
        technologies: ["AWS Redshift", "Advanced SQL", "Stored Procedures", "Python"],
        impact: "One checked load path",
        metrics: "HIPAA-regulated data"
    },
    {
        id: 2,
        title: "PySpark Quality Framework",
        category: "databricks",
        description:
            "Built a reusable PySpark quality framework for structured and semi-structured feeds.",
        technologies: ["PySpark", "Python", "Databricks", "Delta Lake"],
        impact: "Checks reused across feeds",
        metrics: "One check set"
    },
    {
        id: 3,
        title: "Healthcare Data QA & Claims Reconciliation",
        category: "healthcare-qa",
        description:
            "Automated claims reconciliation in SQL, catching duplicate and missing claims before reports are built.",
        technologies: ["Oracle SQL", "ODI", "Python", "Reconciliation"],
        impact: "Manual reconciliation removed",
        metrics: "35% faster reports"
    },
];

export interface Certification {
    name: string;
    issuer: string;
    year: string;
    /** "certification" = proctored issuer credential; "course" = completed training. */
    type: "certification" | "course";
    /** Public verification URL (Credly or issuer). Shows a "Verify credential" link when set. */
    verifyUrl?: string;
    icon: IconType;
}

export const certifications: Certification[] = [
    {
        name: "Databricks Certified Data Engineer Professional",
        issuer: "Databricks",
        year: "2024",
        type: "certification",
        icon: SiDatabricks
    },
    {
        name: "Databricks Certified Associate Developer for Apache Spark",
        issuer: "Databricks",
        year: "2023",
        type: "certification",
        icon: SiApachespark
    },
    {
        name: "Microsoft Azure Data Fundamentals (DP-900)",
        issuer: "Microsoft",
        year: "2023",
        type: "certification",
        icon: VscAzure
    },
    {
        name: "Data Engineering Foundations Specialization",
        issuer: "IBM",
        year: "2024",
        type: "course",
        icon: FaBuilding
    },
    {
        name: "Databases and SQL for Data Science with Python",
        issuer: "IBM",
        year: "2024",
        type: "course",
        icon: SiPython
    },
    {
        name: "Snowflake SnowPro Core Certification",
        issuer: "Snowflake",
        year: "2022",
        type: "certification",
        icon: SiSnowflake
    },
    {
        name: "Generative AI Fundamentals",
        issuer: "Databricks",
        year: "2024",
        type: "course",
        icon: SiDatabricks
    },
    {
        name: "Oracle Certified Professional: Java SE 11 Developer",
        issuer: "Oracle",
        year: "2021",
        type: "certification",
        icon: SiOracle
    },
    {
        name: "Apache Spark 3 Fundamentals with Scala",
        issuer: "Databricks",
        year: "2023",
        type: "course",
        icon: SiApachespark
    },
    {
        name: "Python for Data Science, AI & Development",
        issuer: "IBM",
        year: "2022",
        type: "course",
        icon: SiPython
    },
    {
        name: "ETL and Data Pipelines with Shell & Kafka",
        issuer: "IBM",
        year: "2024",
        type: "course",
        icon: FaBuilding
    },
    {
        name: "Big Data with PySpark",
        issuer: "Coursera",
        year: "2022",
        type: "course",
        icon: SiCoursera
    }
];

export const recommendations = [
    {
        id: 1,
        text: "I've had the pleasure of working alongside Sabrin Lal Singh at Techkraft Inc.... he's one of those rare professionals who truly makes everyone around him better. What strikes me most about Sabrin is his integrity... As a mentor, Sabrin is outstanding... He's not just technically excellent he's the kind of person who makes the whole team stronger just by being part of it.",
        author: "Paras Gautam",
        role: "Senior Data Engineer",
        relation: "Colleague",
        company: "Techkraft Inc."
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
        period: "2024 – 2026",
        gpa: "3.78 GPA",
        highlights: "Strategic Management, Leadership, Operations, and Business Analytics."
    },
    {
        degree: "Bachelor’s in Computer Engineering",
        institution: "Kathford International College of Engineering and Management (Tribhuvan University)",
        location: "Lalitpur, Nepal",
        period: "2012 – 2016",
        highlights: "Core engineering foundation in algorithms, database design, distributed systems, and computer networks."
    }
];

export const awards = [
    {
        title: "Best Employee Award 2023",
        organization: "Techkraft Inc. Pvt. Ltd.",
        year: "2023",
        description: "Awarded for engineering leadership and mentorship during 2023 delivery."
    }
];
