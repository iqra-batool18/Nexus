Component Structure and Architecture

Architecture: This is a Vite-based React project using TypeScript.
Tech Stack: Built with React, TypeScript, and Vite.
Folder Structure:
• src/components: Contains reusable parts of the site like chat, investor, and ui.
• src/pages: Contains the full screen views for the app.
• src/context: Used to manage data that needs to be shared across the whole app

Component Structure: Components are organized by features like chat, collaboration, entrepreneur investor, layout and ui.
• Chat contains file such as: ChatMessage.tsx, ChatUserList.tsx
• Collaboration contains a file named CollaborationRequestCard.tsx
• Entrepreneur contains EntrepreneurCard.tsx
• Investor folder contains InvestorCard.tsx file
• Layout folder contains files such as: DashboardLayout.tsx, Navbar.tsx, and Sidebar.tsx
• Ui contains Avatar.tsx, Badge.tsx, Button.tsx, Card.tsx, and Input.tsx
UI Theme: The project uses Tailwind CSS. Tailwind properties are given as follows:
primary: {
50: '#EFF6FF',
100: '#DBEAFE',
200: '#BFDBFE',
300: '#93C5FD',
400: '#60A5FA',
500: '#3B82F6',
600: '#2563EB',
700: '#1D4ED8',
800: '#1E40AF',
900: '#1E3A8A',
950: '#172554',
},
secondary: {
50: '#F0FDFA',
100: '#CCFBF1',
200: '#99F6E4',
300: '#5EEAD4',
400: '#2DD4BF',
500: '#14B8A6',
600: '#0D9488',
700: '#0F766E',
800: '#115E59',
900: '#134E4A',
950: '#042F2E',
},
accent: {
50: '#FFFBEB',
100: '#FEF3C7',
200: '#FDE68A',
300: '#FCD34D',
400: '#FBBF24',
500: '#F59E0B',
600: '#D97706',
700: '#B45309',
800: '#92400E',
900: '#78350F',
950: '#451A03',
},
success: {
50: '#F0FDF4',
500: '#22C55E',
700: '#15803D',
},
warning: {
50: '#FFFBEB',
500: '#F59E0B',
700: '#B45309',
},
error: {
50: '#FEF2F2',
500: '#EF4444',
700: '#B91C1C',
},
}
fontFamily: {
sans: ['Inter var', 'sans-serif'],
},
animation: {
'fade-in': 'fadeIn 0.5s ease-in-out',
'slide-in': 'slideIn 0.3s ease-out',
},
keyframes: {
fadeIn: {
'0%': { opacity: '0' },
'100%': { opacity: '1' },
},
slideIn: {
'0%': { transform: 'translateY(10px)', opacity: '0' },
'100%': { transform: 'translateY(0)', opacity: '1' },
},
},
}

App is running in my Localhost

My GitHub Repo Link
https://github.com/iqra-batool18/Nexus.git

My Vercel Deployment Link
https://vercel.com/iqra-batool18s-projects/iqra-batool-nexus
