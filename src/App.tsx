import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { About } from './components/About';
import { Process } from './components/Process';
import { Contact, Footer } from './components/Contact';
import { useTheme } from './hooks/useTheme';

function App() {
    const { theme, toggle } = useTheme();

    return (
        <div className="relative min-h-screen text-foreground bg-background selection:bg-accent selection:text-background w-full overflow-x-hidden">
            <CustomCursor />
            <Navigation theme={theme} toggleTheme={toggle} />

            <main>
                <Hero />
                <SelectedWork />
                <About />
                <Process />
                <Contact />
            </main>

            <Footer />
        </div>
    )
}

export default App;
