import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectTunnelCanvas3D from '../3d/ProjectTunnelCanvas3D';
import TunnelProjectCard from '../projects/TunnelProjectCard';
import TunnelDepthGhostCard from '../projects/TunnelDepthGhostCard';
import TunnelNavigationControls from '../projects/TunnelNavigationControls';
import ExploreProjectModal from '../projects/ExploreProjectModal';
import { TUNNEL_PROJECTS_DATA } from '../../data/projectsData';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const Projects = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [exploreProject, setExploreProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoCruising, setIsAutoCruising] = useState(true);
  const [cruiseProgress, setCruiseProgress] = useState(0);

  // Touch tracking
  const touchStartRef = useRef({ x: 0, y: 0 });
  const lastScrollTimeRef = useRef(0);
  const cruiseIntervalDuration = 4800; // 4.8 seconds per project cruise cycle

  const totalProjects = TUNNEL_PROJECTS_DATA.length; // 7
  const currentProject = TUNNEL_PROJECTS_DATA[currentIndex];
  const depthCard1Project = TUNNEL_PROJECTS_DATA[(currentIndex + 1) % totalProjects];
  const depthCard2Project = TUNNEL_PROJECTS_DATA[(currentIndex + 2) % totalProjects];
  const progress = currentIndex / (totalProjects - 1); // 0 to 1

  // Navigate to project index with smooth inward emergence transition
  const handleNavigate = useCallback((index) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setCruiseProgress(0);
    playCyberBeep(680, 0.04);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 550);
  }, [currentIndex, isTransitioning]);

  // Continuous Inward Animation Engine (Continuously moves cards towards the inner tunnel)
  useEffect(() => {
    let animId;
    let startTime = performance.now();

    const tick = (now) => {
      // Pause inward movement when hovered or when full specs modal is open or when disabled
      if (isHovered || exploreProject || !isAutoCruising) {
        startTime = now - (cruiseProgress / 100) * cruiseIntervalDuration;
        animId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / cruiseIntervalDuration) * 100);
      setCruiseProgress(pct);

      if (elapsed >= cruiseIntervalDuration) {
        // Automatically glide inward to the next project!
        setCurrentIndex((prev) => (prev + 1) % totalProjects);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 550);
        startTime = now;
        setCruiseProgress(0);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isHovered, exploreProject, isAutoCruising, cruiseProgress, totalProjects]);

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!inView || exploreProject) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNavigate((currentIndex + 1) % totalProjects);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleNavigate((currentIndex - 1 + totalProjects) % totalProjects);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalProjects, handleNavigate, exploreProject]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNavigate((currentIndex + 1) % totalProjects);
      } else {
        handleNavigate((currentIndex - 1 + totalProjects) % totalProjects);
      }
    }
  };

  // Wheel interaction: scroll down/up travels through the tunnel
  const handleWheel = (e) => {
    if (exploreProject) return;

    const now = Date.now();
    if (now - lastScrollTimeRef.current < 450) return;

    if (Math.abs(e.deltaY) > 28) {
      if (e.deltaY > 0 && currentIndex < totalProjects - 1) {
        lastScrollTimeRef.current = now;
        handleNavigate(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        lastScrollTimeRef.current = now;
        handleNavigate(currentIndex - 1);
      }
    }
  };

  // Continuous inward motion offset (0 to 100%)
  const inwardOffset = !isHovered && isAutoCruising ? cruiseProgress : 0;
  const currentZOffset = -inwardOffset * 0.35; // 0px to -35px continuous inward glide
  const currentScaleOffset = 1 - inwardOffset * 0.0006; // 1.0 to 0.94

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-20 overflow-hidden scroll-mt-24 min-h-screen flex flex-col justify-between"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Deep Space Project Tunnel Canvas with Concentric Hex Apertures & Speed Rails */}
      <ProjectTunnelCanvas3D
        activeProjectIndex={currentIndex}
        progress={progress}
        isHovered={isHovered}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col justify-between flex-1">
        
        {/* Section Header */}
        <div className="mb-2 text-center">
          <SectionHeading
            tag="// 04. ENGINEERING REPERTOIRE"
            title="3D Futuristic Project Tunnel"
            subtitle="Explore seven production systems moving continuously into the inner tunnel. Hover over any project to inspect full architecture and metrics."
          />
        </div>

        {/* Central Display: 3D Stage with Continuous Inward Depth Stream */}
        <div
          className="relative w-full my-auto flex items-center justify-center py-6 min-h-[460px]"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Depth Card 2: Floating deepest near the inner vortex core */}
          <TunnelDepthGhostCard
            project={depthCard2Project}
            depthLevel={2}
            onClick={() => handleNavigate((currentIndex + 2) % totalProjects)}
            inwardOffset={inwardOffset}
          />

          {/* Depth Card 1: Floating in mid tunnel depth */}
          <TunnelDepthGhostCard
            project={depthCard1Project}
            depthLevel={1}
            onClick={() => handleNavigate((currentIndex + 1) % totalProjects)}
            inwardOffset={inwardOffset}
          />

          {/* Front Active Card: In sharp focus, continuously gliding towards inner side */}
          <div
            className="w-full flex items-center justify-center z-20"
            style={{
              transform: isTransitioning
                ? 'scale(0.35) translate3d(0, 24px, -320px)'
                : `scale(${currentScaleOffset}) translate3d(0, 0, ${currentZOffset}px)`,
              opacity: isTransitioning ? 0 : 1,
              filter: isTransitioning ? 'blur(8px)' : 'blur(0px)',
              transition: isTransitioning
                ? 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'transform 0.1s linear'
            }}
          >
            <TunnelProjectCard
              project={currentProject}
              onExploreProject={setExploreProject}
              onHoverStateChange={setIsHovered}
            />
          </div>
        </div>

        {/* Project Navigation Controls: PROJECT 01 / 07, Progress, Auto-Cruise & 7 Waypoint Indicators */}
        <div className="mt-4 pt-2">
          <TunnelNavigationControls
            currentIndex={currentIndex}
            onNavigate={handleNavigate}
            isAutoCruising={isAutoCruising}
            onToggleAutoCruise={() => setIsAutoCruising(!isAutoCruising)}
            cruiseProgress={cruiseProgress}
          />
        </div>

      </div>

      {/* Expanded Explore Project Full Specs Modal */}
      {exploreProject && (
        <ExploreProjectModal
          project={exploreProject}
          onClose={() => setExploreProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
