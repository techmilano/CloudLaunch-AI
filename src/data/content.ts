/**
 * Shared page copy: solutions and process steps.
 * Edit here and the Home, Solutions, and How It Works pages all update.
 *
 * Copy rules for this site:
 * - Describe what a workflow can be set up to do, not what it guarantees.
 * - No promised response times, integrations, certifications, or results.
 * - Your team stays in control; we never pitch replacing staff.
 */

export const solutions = [
  {
    id: 'ai-front-desk',
    icon: 'message',
    name: 'AI Front Desk',
    summary:
      'Responds to inquiries from your website and messages, answers the common questions you approve, captures the details your team needs, and routes each request to the right person.',
    useCases: [
      'Answering questions about hours, location, services offered, and what to bring to an appointment — using answers your team has written or approved.',
      'Collecting a caller or visitor’s name, contact details, and what they need, so nobody has to ask twice.',
      'Sending new-customer requests to whoever handles estimates, and existing-customer questions to the office.',
      'Recognizing when a question is outside the approved list and handing it to a person instead of guessing.',
    ],
    youControl:
      'You approve the questions it answers, the wording it uses, and who receives each type of request.',
  },
  {
    id: 'missed-call-recovery',
    icon: 'phone-missed',
    name: 'Missed-Call Recovery',
    summary:
      'When a call goes unanswered, a follow-up message can go out so the caller knows they were heard — turning more missed calls into conversations your team can pick up.',
    useCases: [
      'Texting callers who reach you after hours, during lunch, or while every line is busy.',
      'Asking a short question or two so your team knows what the call was about before calling back.',
      'Giving staff a clear list of missed callers to follow up with, instead of digging through call logs.',
      'Respecting opt-outs and the messaging rules that apply to your business.',
    ],
    youControl:
      'You decide which calls get a follow-up, what the message says, and when it is appropriate to send one.',
  },
  {
    id: 'industry-workflows',
    icon: 'storefront',
    name: 'Industry-Specific Workflows',
    summary:
      'A plumbing company, a dental office, and a property manager field very different questions. We adapt the workflow to how your industry actually runs, instead of dropping in a generic chatbot.',
    useCases: [
      'Home services: separating emergency calls from routine quotes, and collecting address and job details up front.',
      'Healthcare and wellness practices: handling scheduling questions while keeping clinical and patient-specific questions with your staff.',
      'Professional services: capturing the basics of a new inquiry and routing it for a conflict check or consultation.',
      'Property management: sorting maintenance requests from leasing questions and sending each to the right queue.',
    ],
    youControl:
      'You set the boundaries for your field — what can be handled automatically and what always goes to a person.',
  },
] as const;

export const steps = [
  {
    name: 'Discover',
    short: 'We learn how calls and inquiries reach you today, where they stall, and who should handle what.',
    detail:
      'We start with a conversation about your business: how customers contact you, what they usually ask, what happens after hours, and where follow-up tends to slip. We also ask early about privacy, access, and any compliance requirements that apply to you.',
    fromYou: 'An hour or two of time, a walkthrough of your current process, and the questions customers ask most.',
    outcome: 'A clear picture of where a workflow could help — and an honest answer if it isn’t a good fit.',
  },
  {
    name: 'Design',
    short: 'We design and configure a workflow around your rules, your wording, and your tools.',
    detail:
      'We map out each path an inquiry can take, draft the answers and messages, and decide with you when a person should step in. We confirm which of your existing systems we can connect to before relying on them.',
    fromYou: 'Review and approval of the answers, messages, and routing rules.',
    outcome: 'A documented workflow your team has signed off on before anything goes live.',
  },
  {
    name: 'Launch',
    short: 'We test with real scenarios, set up human escalation paths, and go live carefully.',
    detail:
      'Before launch, we run through realistic scenarios — including the awkward ones — to check that answers are accurate and handoffs reach the right people. Escalation paths are in place from day one, so anything unexpected goes to your team.',
    fromYou: 'A few people to help test and confirm the handoffs work the way you expect.',
    outcome: 'A live workflow with clear handoffs to your team and a way to pause it if needed.',
  },
  {
    name: 'Monitor and improve',
    short: 'We watch how it performs, review it with you, and refine it over time.',
    detail:
      'After launch we keep an eye on how the workflow is handling real inquiries, flag anything that needs your attention, and make adjustments as your business changes — new services, new hours, new questions.',
    fromYou: 'Periodic check-ins and a heads-up when something in your business changes.',
    outcome: 'A workflow that stays current instead of drifting out of date.',
  },
] as const;

export const oversight = [
  {
    icon: 'check',
    title: 'You approve what gets said',
    text: 'Answers and messages are written or approved by your team. If a question falls outside them, it goes to a person.',
  },
  {
    icon: 'route',
    title: 'Clear handoffs to people',
    text: 'Every workflow has an escalation path. You decide which situations always go straight to your staff.',
  },
  {
    icon: 'shield',
    title: 'Access limited to what’s needed',
    text: 'We connect only the systems a workflow requires and plan for privacy and access controls from the start.',
  },
  {
    icon: 'chart',
    title: 'Regular reviews with you',
    text: 'We review how the workflow is performing and what customers are asking, then adjust with your sign-off.',
  },
] as const;
