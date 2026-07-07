// Intersection Observer for scroll animations (fade in elements)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.skill-card, .project-card, .section-title');
    
    animatableElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index % 3 * 0.1}s, transform 0.6s ease-out ${index % 3 * 0.1}s`;
        observer.observe(el);
    });

    // Mouse tracking effect for project cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.querySelector('.modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    const projectData = {
        'ensemble': `
            <span class="project-tag">Machine Learning</span>
            <h3>Ensemble Learning in Action</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Bank Marketing Prediction</p>
            
            <h4>Strategic Objective</h4>
            <p>Developed a predictive model to identify which bank customers are most likely to subscribe to a term deposit, enabling targeted marketing campaigns and optimizing resource allocation.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Data Engineering:</strong> Engineered stable row signatures (SHA-1 hashing) to detect and remove data leakage between training and testing sets. Handled missing categorical placeholders and dropped post-call leakage columns.</li>
                <li><strong>Modeling Strategy:</strong> Implemented and compared multiple ensemble models including RandomForestClassifier, AdaBoostClassifier, and BaggingClassifier.</li>
                <li><strong>Pipeline Architecture:</strong> Built robust Scikit-Learn Pipelines combining SimpleImputer, StandardScaler, and OneHotEncoder with the estimators.</li>
                <li><strong>Optimization:</strong> Utilized cross-validation (StratifiedKFold) and hyperparameter tuning (GridSearchCV) to optimize model recall and precision.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>Pandas</span>
                <span>Scikit-Learn</span>
                <span>Seaborn</span>
            </div>
        `,
        'rag': `
            <span class="project-tag">Generative AI</span>
            <h3>RAG Evaluation Framework</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Automated Quality Assurance for LLMs</p>
            
            <h4>Strategic Objective</h4>
            <p>Designed and implemented an automated evaluation framework to assess the quality of Retrieval-Augmented Generation (RAG) systems. The goal was to ensure AI-generated responses are accurate, relevant, and strictly grounded in the provided context, mitigating hallucination risks before enterprise deployment.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>LLM-as-a-Judge Pattern:</strong> Utilized the deepeval framework to orchestrate a Gemini-based evaluator model (gemini-3.1-flash-lite) that grades the outputs of other LLMs.</li>
                <li><strong>Triad of Metrics:</strong> Evaluated Contextual Relevancy (quality of retrieved context), Faithfulness/Groundedness (penalizing hallucinations), and Answer Relevancy (directness to user query).</li>
                <li><strong>Automated Thresholding:</strong> Implemented strict pass/fail thresholds (score >= 0.7) for each metric to create a deterministic testing pipeline.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>DeepEval</span>
                <span>Google Gemini API</span>
            </div>
        `,
        'parking': `
            <span class="project-tag">Data Visualization</span>
            <h3>Toronto Parking Enforcement Analysis</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Geospatial Data Engineering</p>
            
            <h4>Strategic Objective</h4>
            <p>Processed and analyzed massive volumes of municipal parking infraction data to uncover temporal and spatial enforcement patterns. The final clean dataset and visualizations provide actionable insights for urban planners and citizens regarding high-risk zones and peak enforcement times.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Geospatial Data Engineering:</strong> Parsed complex geometric strings (WKT POINT data) to extract standardized longitude and latitude coordinates. Exploded intersection strings to calculate mean coordinate aggregations for base streets.</li>
                <li><strong>Fuzzy Logic Text Matching:</strong> Implemented advanced string matching using Levenshtein distance (token_set_ratio) to standardize messy, user-inputted street names against the official Toronto Centreline street database.</li>
                <li><strong>Temporal Normalization:</strong> Engineered robust date-time parsing logic to handle diverse date_of_infraction formats, combining them into clean datetime objects for time-series analysis.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>Pandas</span>
                <span>Levenshtein</span>
            </div>
        `,
        'db_etl': `
            <span class="project-tag">Data Engineering</span>
            <h3>Weather Data ETL Pipeline</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Database Architecture & Ingestion</p>
            
            <h4>Strategic Objective</h4>
            <p>Architected a robust, end-to-end Data Ingestion and ETL (Extract, Transform, Load) pipeline to aggregate real-time meteorological data across Canadian regions. This infrastructure empowers downstream analytics and dashboarding by ensuring high data quality and centralized storage in a relational database.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>API Extraction:</strong> Interfaced with the OpenWeather REST API to programmatically extract real-time weather metadata based on dynamically queried geospatial postal codes.</li>
                <li><strong>Data Transformation:</strong> Utilized pandas to clean and transform raw JSON responses into a structured tabular format. Engineered new features such as timestamp parsing and categorical visibility classifications.</li>
                <li><strong>Database Loading:</strong> Designed and implemented secure SQL Server database connections using SQLAlchemy and pyodbc. Executed bulk-inserts into a structured schema using efficient chunking methods.</li>
                <li><strong>Schema Enforcement:</strong> Enforced strict SQL data types during the ingestion process to maintain relational database integrity.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>SQL Server</span>
                <span>SQLAlchemy</span>
                <span>Pandas</span>
            </div>
        `,
        'mci': `
            <span class="project-tag">Predictive Analytics</span>
            <h3>Toronto MCI Predictive Modelling</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Crime Forecasting & Explainable AI</p>
            
            <h4>Strategic Objective</h4>
            <p>Developed an actionable predictive analytics framework to forecast Major Crime Indicators (MCI) across Toronto neighbourhoods. By predicting crime volumes and generating local risk scores, the model provides data-driven intelligence for optimal police resource allocation and targeted community safety strategies.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Comprehensive EDA & Forecasting:</strong> Conducted spatial/temporal EDA and implemented explainable time-series baselines (Seasonal Naïve, Moving Average) evaluated via MAE/MAPE to generate next-month volume forecasts.</li>
                <li><strong>Risk Score Generation:</strong> Engineered a localized risk score metric to quantify threat levels across specific jurisdictions based on historical and forecasted incident volumes.</li>
                <li><strong>Explainable AI via LLM Integration:</strong> Integrated a Large Language Model to translate raw model predictions into plain English. This promotes Explainable AI (XAI) and fosters public trust by ensuring transparency.</li>
                <li><strong>LLM Governance & Guardrails:</strong> Implemented strict prompt governance to control the LLM's tone—ensuring public-facing explanations are transparent and informative, without being alarmist or scary.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>Pandas</span>
                <span>LLMs / Prompt Engineering</span>
                <span>Explainable AI (XAI)</span>
            </div>
        `,
        'digital': `
            <span class="project-tag">Business Strategy</span>
            <h3>Digital Transformation Strategy</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Enterprise Optimization & Analytics Integration</p>
            
            <h4>Strategic Objective</h4>
            <p>Analyzed real-world enterprise case studies (Domino’s Pizza, Aurora Health Care) to propose data-driven digital transformation frameworks. The objective was to demonstrate how legacy organizations can leverage analytics, IoT, and cloud technologies to optimize operations and pivot to tech-centric business models.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Operational Bottleneck Analysis:</strong> Evaluated existing supply chain and customer-facing workflows to identify inefficiencies and areas ripe for digital disruption.</li>
                <li><strong>Data-Driven Framework Design:</strong> Developed strategic roadmaps for integrating advanced analytics into core business operations, shifting organizations from reactive to predictive operational states.</li>
                <li><strong>Customer Experience (CX) Optimization:</strong> Outlined strategies for deploying mobile and web-based touchpoints (e.g., Domino's tracker ecosystem) to capture behavioral data and enhance consumer engagement.</li>
                <li><strong>Change Management:</strong> Addressed the organizational and cultural shifts required to successfully implement complex digital initiatives across legacy departments.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Digital Transformation</span>
                <span>Operational Research</span>
                <span>Supply Chain Analytics</span>
                <span>Change Management</span>
            </div>
        `,
        'credpath': `
            <span class="project-tag">Generative AI</span>
            <h3>credPath AI: The Agentic Loan Advisor</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Multi-Agent Orchestration & Risk Modeling</p>
            
            <h4>Strategic Objective</h4>
            <p>Bridged the gap between predictive risk modeling and customer experience by building a multi-agent orchestrated lending platform. Instead of simply rejecting applicants, the system provides full transparency and actionable recovery plans, ultimately increasing future loan volume while maintaining strict compliance.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Multi-Agent Orchestration:</strong> Architected a complex 6-agent system routing logic between specialized agents handling Risk Prediction, Explanations, Compliance, Coaching, Negotiation, and LLM Translation.</li>
                <li><strong>Hybrid AI Approach:</strong> Combined predictive Machine Learning (XGBoost for risk scoring) with Generative AI (Google Gemini LLM for dynamic coaching and plain-English translation of financial jargon).</li>
                <li><strong>Explainable AI & Recovery:</strong> Implemented an Explanation Engine using SHAP values to explain loan denials, while a dedicated Coaching Agent synthesizes these values into a personalized, actionable recovery roadmap for the applicant.</li>
                <li><strong>Automated Compliance Guardrails:</strong> Engineered a dedicated Compliance Checker agent to automatically enforce age fairness, Debt-to-Income (DTI) limits, and generate legally required adverse action notices.</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Python</span>
                <span>Google Gemini</span>
                <span>XGBoost</span>
                <span>SHAP</span>
            </div>
        `,
        'customer360': `
            <span class="project-tag">Data Engineering</span>
            <h3>Customer 360 Dimensional Modeling</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Advanced SQL & Data Architecture</p>
            
            <h4>Strategic Objective</h4>
            <p>Engineered a comprehensive Customer 360 data mart to unify disparate transactional data into a single source of truth. This centralized architecture allows business stakeholders to analyze customer lifetime value (LTV), conversion metrics, and purchasing behavior at a highly granular level.</p>
            
            <h4>Technical Execution</h4>
            <ul>
                <li><strong>Dimensional Modeling:</strong> Designed and implemented a robust Star Schema consisting of Fact tables (Orders, Conversions) and Dimension tables (Customer, Date, Product) to optimize analytical queries.</li>
                <li><strong>Advanced SQL Engineering:</strong> Authored a highly complex, 250+ line SQL transformation script leveraging multiple Common Table Expressions (CTEs) to clean and aggregate raw transactional data.</li>
                <li><strong>Window Functions & Analytics:</strong> Utilized advanced Window Functions (<code>ROW_NUMBER()</code>, <code>LEAD()</code>, <code>SUM() OVER PARTITION</code>) to calculate rolling cumulative revenue and track sequential customer conversion events across time.</li>
                <li><strong>Data Quality & Integrity:</strong> Enforced strict schema definitions and utilized <code>COALESCE</code> logic to handle missing data, ensuring absolute accuracy in financial metrics (discounts vs. total paid).</li>
            </ul>
            
            <h4>Tech Stack</h4>
            <div class="tech-stack" style="margin-top: 1rem;">
                <span>Advanced SQL</span>
                <span>Dimensional Modeling</span>
                <span>Data Warehousing</span>
                <span>ETL</span>
            </div>
        `
    };

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-project');
            if (projectData[projectId]) {
                modalBody.innerHTML = projectData[projectId];
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
