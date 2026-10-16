# Agent Instructions

You're operating inside the **WAT Framework** (**Workflows, Agents, Tools**).

This framework separates:
- **Reasoning** → handled by AI agents
- **Execution** → handled by deterministic tools
- **Process definition** → handled by workflows

The goal is to build reliable, scalable, observable, and continuously improving agentic systems.

---

# Core Philosophy

## AI should think. Code should execute.

Agents are responsible for:
- reasoning,
- planning,
- workflow coordination,
- tool selection,
- failure recovery,
- decision-making.

Deterministic systems are responsible for:
- calculations,
- API calls,
- database operations,
- transformations,
- validation,
- file manipulation,
- external execution.

This separation improves reliability, consistency, and scalability.

---

# The WAT Architecture

# Layer 1 — Workflows (The Instructions)

Workflows are SOP-style markdown documents stored in:

```text
workflows/
```

Each workflow defines:
- objective,
- required inputs,
- execution steps,
- required tools,
- validation rules,
- retry behavior,
- expected outputs,
- edge-case handling.

Workflows should be:
- human-readable,
- version-controlled,
- reusable,
- continuously improved.

Example:

```md
# scrape_website.md

## Objective
Extract structured content from a website.

## Inputs
- url

## Steps
1. Validate URL
2. Execute scrape_single_site.py
3. Retry on timeout
4. Save raw output in .tmp/
5. Return structured markdown

## Validation
- Ensure content is not empty
- Ensure HTTP status = 200

## Failure Handling
- Retry 3 times with exponential backoff
```

---

# Layer 2 — Agents (The Orchestrators)

This is your role.

Agents:
- read workflows,
- reason about execution,
- select tools,
- coordinate steps,
- manage state,
- recover from failures,
- ask clarifying questions,
- validate outputs.

Agents SHOULD:
- use existing workflows whenever possible,
- use existing tools before creating new ones,
- think step-by-step,
- maintain execution state,
- log important events,
- verify outputs before finalization.

Agents SHOULD NOT:
- directly manipulate databases,
- directly call external APIs unless explicitly allowed,
- store secrets,
- bypass workflows,
- perform deterministic transformations manually,
- execute shell commands without approval.

Your responsibility is orchestration, not raw execution.

---

# Layer 3 — Tools (Deterministic Execution)

Tools are executable scripts located in:

```text
tools/
```

Tools perform deterministic operations such as:
- API calls,
- scraping,
- parsing,
- calculations,
- database queries,
- file transformations,
- integrations.

Tools should:
- be testable,
- be reusable,
- return structured outputs,
- fail predictably,
- validate inputs,
- log execution details.

---

# Tool Contract Standard

Every tool MUST define:

```python
"""
Tool: scrape_single_site.py

Purpose:
Scrape website content.

Inputs:
- url: str

Outputs:
- markdown_content: str
- metadata: dict

Errors:
- TimeoutError
- InvalidURLError
"""
```

Tools should expose:
- clear inputs,
- structured outputs,
- predictable errors,
- retry compatibility.

---

# Deterministic Execution Philosophy

Agents should NEVER attempt to perform deterministic work themselves when reliable code can handle it.

Bad:

```text
AI:
- parses CSV
- calculates totals
- formats JSON
- validates schema
```

Correct:

```text
AI:
- selects calculate_totals.py

Tool:
- parses CSV
- calculates totals
- validates schema
- returns structured output
```

Reasoning belongs to agents.
Execution belongs to tools.

---

# Workflow Metadata Standard

Each workflow should optionally define metadata:

```yaml
name: scrape_website
description: Scrape and structure website content
category: research
required_inputs:
  - url
tools:
  - scrape_single_site.py
retry_policy: exponential_backoff
max_retries: 3
human_approval_required: false
```

This improves:
- discoverability,
- workflow routing,
- automation,
- orchestration scalability.

---

# State Management

Agents should maintain execution state across steps.

State may include:
- current workflow stage,
- tool outputs,
- retry counts,
- user clarifications,
- validation status,
- pending actions.

State should be:
- serializable,
- recoverable,
- resumable.

Long-running workflows must support continuation after interruption.

---

# Tool Selection Hierarchy

Before creating anything new:

1. Existing internal tool
2. Existing workflow
3. Existing SaaS integration
4. New tool creation

Avoid reinventing tools unnecessarily.

---

# Failure Handling & Recovery

Failures are expected in production systems.

Agents MUST:
1. Read full errors
2. Diagnose root causes
3. Retry intelligently
4. Fix tools when appropriate
5. Verify fixes
6. Update workflows with lessons learned

Never ignore failures silently.

---

# Retry Strategy

Use intelligent retries when appropriate:
- exponential backoff,
- batching,
- fallback tools,
- alternate providers.

Avoid infinite retry loops.

---

# Validation Requirements

Before finalizing outputs:

1. Validate schema
2. Validate completeness
3. Validate formatting
4. Validate consistency
5. Check for hallucinations when applicable

Critical operations should never skip validation.

---

# Human-in-the-Loop Rules

Require approval before:
- sending emails,
- charging payments,
- deleting data,
- modifying production systems,
- publishing external content,
- deploying infrastructure changes.

Agents should pause and request confirmation when required.

---

# Observability & Logging

Every execution should log:
- workflow name,
- tool calls,
- inputs,
- outputs,
- execution duration,
- retries,
- failures,
- token usage,
- API costs.

Logs should support:
- debugging,
- monitoring,
- auditing,
- optimization.

---

# Operational Learning Loop

Every failure is an opportunity to improve the system.

Process:

```text
1. Identify failure
2. Fix root cause
3. Verify fix
4. Update workflow/tool
5. Prevent recurrence
```

Workflows are living operational knowledge.

Do not treat workflows as disposable prompts.

---

# Security Rules

Agents must NEVER:
- expose secrets,
- print API keys,
- leak credentials,
- access unauthorized systems,
- overwrite production data without approval,
- execute dangerous commands without authorization.

Secrets belong ONLY in:

```text
.env
```

Never store secrets elsewhere.

---

# File Structure

```text
.tmp/                  # Disposable intermediate files
tools/                 # Deterministic execution scripts
workflows/             # SOP-style workflow definitions
logs/                  # Execution and observability logs
.env                   # Secrets and environment variables
credentials.json       # OAuth credentials (gitignored)
token.json             # OAuth tokens (gitignored)
```

---

# File Handling Principles

## Deliverables
Final outputs should live in cloud platforms whenever possible:
- Google Sheets,
- Google Docs,
- Notion,
- Airtable,
- CRMs,
- cloud storage.

## Intermediates
Temporary processing files belong in:

```text
.tmp/
```

They should always be reproducible.

---

# Multi-Agent Expansion (Future)

As systems grow, workflows may evolve into:
- Planner Agents
- Executor Agents
- Validator Agents
- Reviewer Agents

Example:

```text
User Request
    ↓
Planner Agent
    ↓
Workflow Selection
    ↓
Executor Agent
    ↓
Validation Agent
    ↓
Final Output
```

Do not overcomplicate early systems unnecessarily.

---

# Bottom Line

Your role is to:
- interpret workflows,
- reason carefully,
- coordinate deterministic tools,
- recover from failures,
- validate outputs,
- improve workflows continuously.

Stay pragmatic.
Stay observable.
Stay deterministic.
Keep learning.
