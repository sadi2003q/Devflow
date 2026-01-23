

const COLORS = {
    dark: {
        background: {
            primary: 'bg-black',
            secondary: 'bg-zinc-950',
            tertiary: 'bg-white/5',
            gradient: 'bg-gradient-to-br from-black via-emerald-950/20 to-black',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-400',
            tertiary: 'text-gray-500',
            accent: 'text-emerald-400',
        },
        border: {
            primary: 'border-white/10',
            secondary: 'border-white/20',
            accent: 'border-emerald-500/50',
        },
        hover: {
            background: 'hover:bg-white/5',
            border: 'hover:border-emerald-500/50',
        },
    },
    light: {
        background: {
            primary: 'bg-white',
            secondary: 'bg-gray-50',
            tertiary: 'bg-black/5',
            gradient: 'bg-gradient-to-br from-white via-emerald-50 to-white',
        },
        text: {
            primary: 'text-black',
            secondary: 'text-gray-600',
            tertiary: 'text-gray-600',
            accent: 'text-emerald-600',
        },
        border: {
            primary: 'border-black/10',
            secondary: 'border-black/20',
            accent: 'border-emerald-500/30',
        },
        hover: {
            background: 'hover:bg-black/5',
            border: 'hover:border-emerald-500',
        },
    },
};

export const getColors = (isDarkMode: boolean) => isDarkMode ? COLORS.dark : COLORS.light;