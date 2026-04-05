'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  HiOutlineUserGroup, HiOutlineXMark, HiOutlinePlusCircle,
  HiOutlineExclamationTriangle, HiOutlineBanknotes, HiOutlineShoppingCart,
  HiOutlineDocumentText, HiOutlineMagnifyingGlass, HiOutlineArrowPath,
  HiOutlineChevronDown, HiOutlineChevronRight, HiOutlineMapPin,
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays, HiOutlineCube,
  HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineSquares2X2,
  HiOutlineListBullet, HiOutlineAdjustmentsHorizontal, HiOutlineRocketLaunch,
  HiOutlineUserPlus, HiOutlineStar, HiOutlineEye, HiOutlinePencilSquare,
  HiOutlineTrash, HiOutlineGlobeAlt, HiOutlineBuildingOffice,
  HiOutlineChartBar, HiOutlineArrowTrendingUp, HiOutlineHeart,
  HiOutlineClock, HiOutlineInformationCircle, HiOutlineFire,
  HiOutlineCheckBadge, HiOutlineEllipsisHorizontal, HiOutlineBolt,
} from 'react-icons/hi2';

/* ═══════════════════════════════════════════
   CSS — all animations, layouts, interactions
   ═══════════════════════════════════════════ */

const globalCSS = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(35px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-35px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(35px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes entranceBlur {
    from { opacity: 0; filter: blur(12px); transform: translateY(20px); }
    to   { opacity: 1; filter: blur(0); transform: translateY(0); }
  }
  @keyframes orbDrift1 {
    0%,100% { transform: translate(0,0) scale(1); }
    25%     { transform: translate(70px,-50px) scale(1.12); }
    50%     { transform: translate(-35px,35px) scale(0.9); }
    75%     { transform: translate(55px,25px) scale(1.05); }
  }
  @keyframes orbDrift2 {
    0%,100% { transform: translate(0,0) scale(1); }
    25%     { transform: translate(-60px,45px) scale(0.95); }
    50%     { transform: translate(45px,-28px) scale(1.1); }
    75%     { transform: translate(-25px,-45px) scale(1); }
  }
  @keyframes orbDrift3 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(45px,55px) scale(1.07); }
    66%     { transform: translate(-55px,-18px) scale(0.93); }
  }
  @keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes textShine {
    0%   { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes breathe {
    0%,100% { transform: scale(1); opacity: 1; }
    50%     { transform: scale(1.25); opacity: 0.6; }
  }
  @keyframes iconFloat {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%     { transform: translateY(-5px) rotate(3deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes progressGrow {
    from { width: 0%; }
    to   { width: var(--target-width, 0%); }
  }
  @keyframes successPop {
    0%   { transform: scale(0.5); opacity: 0; }
    50%  { transform: scale(1.08); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes errorShake {
    0%,100% { transform: translateX(0); }
    10%,30%,50%,70%,90% { transform: translateX(-4px); }
    20%,40%,60%,80% { transform: translateX(4px); }
  }
  @keyframes cardShine {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes dotPulse {
    0%,80%,100% { transform: scale(0); opacity: 0; }
    40%          { transform: scale(1); opacity: 1; }
  }
  @keyframes confettiDrop {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(40px) rotate(360deg); opacity: 0; }
  }
  @keyframes sparkBarGrow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.92) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes rowHighlight {
    0%   { background: rgba(34,197,94,0.15); }
    100% { background: transparent; }
  }
  @keyframes waveSlide {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes counterPop {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes avatarGlow {
    0%,100% { box-shadow: 0 0 15px rgba(59,130,246,0.2); }
    50%     { box-shadow: 0 0 30px rgba(59,130,246,0.5); }
  }
  @keyframes slideReveal {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
  @keyframes heartBeat {
    0%,100% { transform: scale(1); }
    25%     { transform: scale(1.1); }
    50%     { transform: scale(1); }
    75%     { transform: scale(1.1); }
  }
  @keyframes statusPulse {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.5; }
  }
  @keyframes borderDance {
    0%   { border-color: rgba(59,130,246,0.2); }
    33%  { border-color: rgba(139,92,246,0.2); }
    66%  { border-color: rgba(34,197,94,0.2); }
    100% { border-color: rgba(59,130,246,0.2); }
  }
  @keyframes timelineReveal {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ===== ROOT ===== */
  .cust-root {
    min-height: 100vh;
    background: linear-gradient(160deg, #070b14 0%, #0f172a 30%, #1a1040 60%, #0f172a 100%);
    padding: 1.5rem 2rem 3rem;
    position: relative; overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  }

  /* ===== BACKGROUND ORBS ===== */
  .cust-orb { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
  .cust-orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%); top: -8%; left: -4%; animation: orbDrift1 26s ease-in-out infinite; }
  .cust-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%); top: 50%; right: -6%; animation: orbDrift2 30s ease-in-out infinite; }
  .cust-orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%); bottom: -5%; left: 30%; animation: orbDrift3 22s ease-in-out infinite; }

  .cust-content { position: relative; z-index: 2; }
  .anim-entry { animation: entranceBlur 0.65s ease-out both; }

  /* ===== HEADER ===== */
  .cust-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.75rem; padding: 1.5rem 1.75rem;
    background: linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.85) 100%);
    border-radius: 22px; border: 1px solid rgba(59,130,246,0.12);
    backdrop-filter: blur(20px); position: relative; overflow: hidden;
    animation: fadeInDown 0.7s ease-out both;
  }
  .cust-header::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #22c55e, #f59e0b, #3b82f6);
    background-size: 300% 100%; animation: gradientFlow 5s linear infinite;
  }
  .cust-header-glow {
    position: absolute; top: -50%; left: -30%; width: 200%; height: 200%;
    background: radial-gradient(circle at 20% 30%, rgba(59,130,246,0.06) 0%, transparent 50%);
    pointer-events: none;
  }
  .cust-header-left { position: relative; z-index: 1; }
  .cust-header-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem; }
  .cust-header-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    display: flex; align-items: center; justify-content: center;
    color: white; box-shadow: 0 6px 22px rgba(59,130,246,0.4);
    animation: iconFloat 3s ease-in-out infinite;
  }
  .cust-header-title {
    font-size: 1.75rem; font-weight: 800; letter-spacing: -0.5px;
    background: linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #ffffff 100%);
    background-size: 200% auto; -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; background-clip: text;
    animation: textShine 4s linear infinite;
  }
  .cust-header-subtitle {
    color: rgba(148,163,184,0.7); font-size: 0.88rem;
    display: flex; align-items: center; gap: 0.5rem; margin-left: 3.85rem;
  }
  .cust-status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #22c55e; display: inline-block; position: relative;
  }
  .cust-status-dot::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    background: rgba(34,197,94,0.4); animation: breathe 2s ease-in-out infinite;
  }
  .cust-header-actions { display: flex; gap: 0.65rem; position: relative; z-index: 1; }
  .cust-refresh-btn {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    padding: 0.7rem; border-radius: 12px; color: #94a3b8; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.35s ease;
  }
  .cust-refresh-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(59,130,246,0.3); color: #e2e8f0; }
  .cust-refresh-btn:hover .cust-refresh-icon { transform: rotate(180deg); }
  .cust-refresh-icon { transition: transform 0.5s ease; display: flex; }
  .cust-add-btn {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border: none; padding: 0.7rem 1.35rem; border-radius: 12px;
    color: white; font-weight: 700; font-size: 13px; cursor: pointer;
    display: flex; align-items: center; gap: 0.5rem;
    box-shadow: 0 4px 20px rgba(59,130,246,0.35);
    transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    position: relative; overflow: hidden;
  }
  .cust-add-btn::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
  }
  .cust-add-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 30px rgba(59,130,246,0.5); }
  .cust-add-btn:hover::before { left: 100%; }

  /* ===== WAVE DIVIDER ===== */
  .cust-wave { position: relative; height: 25px; margin: 0.25rem 0 1.25rem; overflow: hidden; opacity: 0.12; z-index: 1; }
  .cust-wave-svg { position: absolute; bottom: 0; width: 200%; height: 100%; animation: waveSlide 8s linear infinite; }

  /* ===== STATS GRID ===== */
  .cust-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
  .cust-stat-card {
    background: linear-gradient(145deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%);
    border-radius: 18px; padding: 1.2rem; border: 1px solid rgba(255,255,255,0.05);
    position: relative; overflow: hidden; cursor: default;
    transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    backdrop-filter: blur(10px);
  }
  .cust-stat-card::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    transition: left 0.7s ease;
  }
  .cust-stat-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.1);
    box-shadow: 0 18px 40px rgba(0,0,0,0.25); }
  .cust-stat-card:hover::before { left: 150%; }
  .cust-stat-card:hover .cust-stat-icon { transform: scale(1.1) rotate(-5deg); }
  .cust-stat-glow {
    position: absolute; top: -15px; right: -15px; width: 90px; height: 90px;
    border-radius: 50%; filter: blur(35px); opacity: 0.3; pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .cust-stat-card:hover .cust-stat-glow { opacity: 0.55; }
  .cust-stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; }
  .cust-stat-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: white; transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  .cust-stat-spark { display: flex; align-items: flex-end; gap: 2px; height: 26px; opacity: 0.4; }
  .cust-spark-bar { width: 4px; border-radius: 2px; transform-origin: bottom; animation: sparkBarGrow 0.7s ease-out both; }
  .cust-stat-value { font-size: 1.55rem; font-weight: 800; color: #fff; margin-bottom: 0.15rem; position: relative; z-index: 1; }
  .cust-stat-label { font-size: 0.78rem; color: rgba(148,163,184,0.65); font-weight: 500; position: relative; z-index: 1; }
  .cust-stat-trend {
    display: inline-flex; align-items: center; gap: 0.2rem;
    font-size: 11px; font-weight: 700; padding: 0.15rem 0.45rem;
    border-radius: 20px; margin-top: 0.5rem;
  }
  .cust-trend-up { background: rgba(34,197,94,0.12); color: #4ade80; }
  .cust-trend-down { background: rgba(239,68,68,0.12); color: #f87171; }

  /* ===== TOOLBAR ===== */
  .cust-toolbar {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap;
  }
  .cust-search-wrap { position: relative; flex: 1; max-width: 400px; }
  .cust-search-icon {
    position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%);
    color: rgba(148,163,184,0.4); pointer-events: none; display: flex;
    transition: color 0.3s ease;
  }
  .cust-search-wrap:focus-within .cust-search-icon { color: #3b82f6; }
  .cust-search {
    width: 100%; padding: 0.75rem 1rem 0.75rem 2.6rem; border-radius: 12px;
    border: 1.5px solid rgba(59,130,246,0.15); background: rgba(15,23,42,0.5);
    color: #e2e8f0; font-size: 13px; outline: none; transition: all 0.35s ease;
  }
  .cust-search::placeholder { color: rgba(148,163,184,0.35); }
  .cust-search:hover { border-color: rgba(59,130,246,0.3); }
  .cust-search:focus {
    border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
    background: rgba(15,23,42,0.65);
  }
  .cust-search-count {
    position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%);
    font-size: 11px; color: rgba(148,163,184,0.4); font-weight: 600;
    padding: 0.15rem 0.5rem; border-radius: 10px; background: rgba(255,255,255,0.03);
  }
  .cust-toolbar-right { display: flex; gap: 0.5rem; align-items: center; }
  .cust-view-toggle {
    display: flex; background: rgba(15,23,42,0.5); border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.06); overflow: hidden;
  }
  .cust-view-btn {
    padding: 0.55rem 0.75rem; background: none; border: none; color: rgba(148,163,184,0.5);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease;
  }
  .cust-view-btn:hover { color: #94a3b8; }
  .cust-view-btn-active { background: rgba(59,130,246,0.15); color: #60a5fa; }
  .cust-filter-btn {
    padding: 0.55rem 1rem; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: #94a3b8; font-size: 12px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 0.4rem; transition: all 0.3s ease;
    position: relative;
  }
  .cust-filter-btn:hover { background: rgba(139,92,246,0.12); border-color: rgba(139,92,246,0.25); color: #c4b5fd; }
  .cust-filter-btn-active { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.3); color: #c4b5fd; }
  .cust-filter-badge {
    position: absolute; top: -6px; right: -6px;
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    color: #fff; font-size: 9px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    animation: successPop 0.3s ease-out both;
    box-shadow: 0 2px 8px rgba(139,92,246,0.4);
  }

  /* ===== FILTER PANEL ===== */
  .cust-filters-panel {
    overflow: hidden; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1.25rem;
  }
  .cust-filters-panel-hidden { max-height: 0; opacity: 0; margin-bottom: 0; }
  .cust-filters-panel-visible { max-height: 400px; opacity: 1; }
  .cust-filters-inner {
    background: linear-gradient(145deg, rgba(30,41,59,0.65) 0%, rgba(15,23,42,0.8) 100%);
    border-radius: 18px; border: 1px solid rgba(139,92,246,0.12);
    backdrop-filter: blur(20px); overflow: hidden;
  }
  .cust-filters-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem; padding: 1.5rem;
  }
  .cust-filter-group {}
  .cust-filter-label {
    font-size: 11px; font-weight: 700; color: rgba(148,163,184,0.7);
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.4rem;
    display: flex; align-items: center; gap: 0.35rem;
  }
  .cust-filter-select, .cust-filter-input {
    width: 100%; padding: 0.6rem 0.85rem; border-radius: 10px;
    border: 1.5px solid rgba(59,130,246,0.15);
    background: rgba(15,23,42,0.6); color: #e2e8f0;
    font-size: 13px; outline: none; transition: all 0.3s ease;
  }
  .cust-filter-select:hover, .cust-filter-input:hover { border-color: rgba(59,130,246,0.3); }
  .cust-filter-select:focus, .cust-filter-input:focus {
    border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  }
  .cust-filter-select option { background: #0f172a; }
  .cust-range-inputs { display: flex; gap: 0.5rem; align-items: center; }
  .cust-range-sep { color: rgba(148,163,184,0.3); font-size: 12px; font-weight: 700; }
  .cust-filters-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1rem 1.5rem; border-top: 1px solid rgba(139,92,246,0.08);
    background: rgba(15,23,42,0.3);
  }
  .cust-clear-btn {
    padding: 0.5rem 1rem; border-radius: 10px;
    border: 1px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.08);
    color: #fca5a5; font-size: 12px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 0.35rem; transition: all 0.3s ease;
  }
  .cust-clear-btn:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); transform: translateY(-1px); }
  .cust-filter-results {
    font-size: 12px; color: rgba(148,163,184,0.6); font-weight: 600;
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 0.75rem; border-radius: 8px;
    background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.12);
  }

  /* ===== ALERTS ===== */
  .cust-alert {
    border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;
    display: flex; align-items: center; gap: 0.65rem;
    font-size: 14px; font-weight: 500; position: relative; overflow: hidden;
  }
  .cust-alert-success {
    background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(15,23,42,0.85));
    border: 1px solid rgba(34,197,94,0.25); color: #4ade80;
    animation: successPop 0.5s ease-out both;
  }
  .cust-alert-error {
    background: linear-gradient(135deg, rgba(239,68,68,0.12), rgba(15,23,42,0.85));
    border: 1px solid rgba(239,68,68,0.25); color: #f87171;
    animation: errorShake 0.5s ease-out both;
  }
  .cust-alert-close {
    margin-left: auto; background: none; border: none; color: inherit;
    cursor: pointer; opacity: 0.6; transition: opacity 0.3s; padding: 0.25rem;
    display: flex; border-radius: 6px;
  }
  .cust-alert-close:hover { opacity: 1; background: rgba(255,255,255,0.06); }
  .cust-confetti {
    position: absolute; width: 6px; height: 6px; border-radius: 2px;
    animation: confettiDrop 1s ease-out both; pointer-events: none;
  }

  /* ===== GRID VIEW ===== */
  .cust-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.25rem; }
  .cust-card {
    background: linear-gradient(145deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.78) 100%);
    border-radius: 20px; padding: 0; border: 1px solid rgba(255,255,255,0.05);
    position: relative; overflow: hidden; backdrop-filter: blur(10px);
    transition: all 0.45s cubic-bezier(0.175,0.885,0.32,1.275); cursor: pointer;
  }
  .cust-card::before {
    content: ''; position: absolute; top: 0; width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    pointer-events: none; left: -100%;
  }
  .cust-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12);
    box-shadow: 0 22px 50px rgba(0,0,0,0.3); }
  .cust-card:hover::before { animation: cardShine 0.8s ease-out both; }
  .cust-card:hover .cust-card-avatar { animation: avatarGlow 1.5s ease-in-out infinite; }
  .cust-card-glow {
    position: absolute; top: -25px; right: -25px; width: 130px; height: 130px;
    border-radius: 50%; filter: blur(45px); opacity: 0.15;
    pointer-events: none; transition: opacity 0.4s ease;
  }
  .cust-card:hover .cust-card-glow { opacity: 0.35; }
  .cust-card-header {
    padding: 1.25rem 1.25rem 0.75rem; display: flex; gap: 0.85rem;
    position: relative; z-index: 1;
  }
  .cust-card-avatar {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    color: white; flex-shrink: 0; font-size: 18px; font-weight: 800;
    position: relative; transition: all 0.4s ease;
    border: 2px solid rgba(255,255,255,0.1);
  }
  .cust-card-avatar-badge {
    position: absolute; bottom: -3px; right: -3px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #22c55e; border: 2px solid #0f172a;
    display: flex; align-items: center; justify-content: center;
  }
  .cust-card-info { flex: 1; min-width: 0; }
  .cust-card-name {
    font-size: 15px; font-weight: 700; color: #ffffff;
    margin-bottom: 0.15rem; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .cust-card-id {
    font-size: 11px; color: rgba(148,163,184,0.45); font-family: monospace;
  }
  .cust-card-location {
    display: flex; align-items: center; gap: 0.3rem;
    font-size: 12px; color: rgba(148,163,184,0.55); margin-top: 0.25rem;
  }
  .cust-card-menu {
    position: absolute; top: 1rem; right: 1rem;
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: rgba(148,163,184,0.4); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease; z-index: 2;
  }
  .cust-card-menu:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
  .cust-card-body { padding: 0.5rem 1.25rem 1rem; }
  .cust-card-contacts { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.75rem; }
  .cust-card-contact {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 12px; color: rgba(148,163,184,0.6);
    transition: color 0.3s ease;
  }
  .cust-card-contact:hover { color: #94a3b8; }
  .cust-card-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem;
  }
  .cust-card-stat {
    padding: 0.7rem; border-radius: 10px; text-align: center;
    transition: all 0.3s ease;
  }
  .cust-card-stat:hover { transform: translateY(-2px); }
  .cust-card-stat-value {
    font-size: 16px; font-weight: 800; color: #ffffff;
    margin-bottom: 0.1rem;
  }
  .cust-card-stat-label {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
  }
  .cust-card-footer {
    padding: 0.75rem 1.25rem; border-top: 1px solid rgba(255,255,255,0.04);
    display: flex; justify-content: space-between; align-items: center;
  }
  .cust-card-date {
    font-size: 11px; color: rgba(148,163,184,0.4);
    display: flex; align-items: center; gap: 0.3rem;
  }
  .cust-card-tier {
    display: inline-flex; align-items: center; gap: 0.25rem;
    padding: 0.2rem 0.6rem; border-radius: 20px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
  }
  .cust-tier-gold { background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1)); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
  .cust-tier-silver { background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.15); }
  .cust-tier-bronze { background: rgba(180,83,9,0.1); color: #f97316; border: 1px solid rgba(180,83,9,0.15); }
  .cust-tier-new { background: rgba(59,130,246,0.1); color: #60a5fa; border: 1px solid rgba(59,130,246,0.15); }

  /* ===== LIST VIEW ===== */
  .cust-list-card {
    background: linear-gradient(145deg, rgba(30,41,59,0.65) 0%, rgba(15,23,42,0.8) 100%);
    border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);
    overflow: hidden; backdrop-filter: blur(10px);
    transition: all 0.4s ease;
  }
  .cust-list-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.15rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .cust-list-title {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 1rem; font-weight: 700; color: #ffffff;
  }
  .cust-list-title-icon { color: #60a5fa; display: flex; }
  .cust-list-count {
    background: rgba(59,130,246,0.12); color: #60a5fa;
    padding: 0.2rem: 0.6rem; border-radius: 20px;
    font-size: 11px; font-weight: 700; border: 1px solid rgba(59,130,246,0.2);
  }
  .cust-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .cust-th {
    text-align: left; padding: 0.8rem 1.25rem; font-size: 11px; font-weight: 700;
    color: rgba(148,163,184,0.6); text-transform: uppercase; letter-spacing: 0.6px;
    border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.35);
  }
  .cust-tr { transition: all 0.3s ease; cursor: pointer; }
  .cust-tr:hover { background: rgba(59,130,246,0.04); }
  .cust-tr:hover .cust-tr-avatar { transform: scale(1.08); }
  .cust-tr-new { animation: rowHighlight 2s ease-out both; }
  .cust-td { padding: 0.9rem 1.25rem; font-size: 13px; color: #e2e8f0; border-bottom: 1px solid rgba(255,255,255,0.03); }
  .cust-tr-cell { display: flex; align-items: center; gap: 0.65rem; }
  .cust-tr-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 700; font-size: 13px;
    flex-shrink: 0; transition: transform 0.35s ease;
  }
  .cust-tr-info { min-width: 0; }
  .cust-tr-name { font-weight: 600; color: #ffffff; font-size: 14px; }
  .cust-tr-email { font-size: 12px; color: rgba(148,163,184,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cust-tr-badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.2rem 0.6rem; border-radius: 20px;
    font-size: 11px; font-weight: 600;
  }
  .cust-badge-orders { background: rgba(139,92,246,0.12); color: #a78bfa; border: 1px solid rgba(139,92,246,0.2); }
  .cust-badge-spent { background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .cust-tr-location { display: flex; align-items: center; gap: 0.3rem; color: rgba(148,163,184,0.6); }
  .cust-tr-actions { display: flex; gap: 0.4rem; }
  .cust-tr-action {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: rgba(148,163,184,0.5); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease;
  }
  .cust-tr-action:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
  .cust-tr-action-delete:hover { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }

  /* ===== EXPANDED ROW ===== */
  .cust-expanded {
    padding: 0; background: rgba(15,23,42,0.5);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .cust-expanded-inner { padding: 1.5rem 1.5rem 1.5rem 4.5rem; }
  .cust-detail-cards {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .cust-detail-card {
    padding: 0.85rem; border-radius: 12px;
    background: rgba(30,41,59,0.5); border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.3s ease;
  }
  .cust-detail-card:hover { border-color: rgba(59,130,246,0.15); transform: translateY(-2px); }
  .cust-detail-label {
    font-size: 10px; font-weight: 700; color: rgba(148,163,184,0.5);
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;
  }
  .cust-detail-value { font-size: 13px; color: #e2e8f0; font-weight: 500; }
  .cust-history-section {}
  .cust-history-title {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 14px; font-weight: 700; color: #ffffff;
    margin-bottom: 0.85rem;
  }
  .cust-history-title-icon { color: #60a5fa; display: flex; }
  .cust-timeline { position: relative; padding-left: 1.75rem; }
  .cust-timeline::before {
    content: ''; position: absolute; left: 6px; top: 0; bottom: 0;
    width: 2px; border-radius: 1px;
    background: linear-gradient(180deg, rgba(59,130,246,0.3), rgba(139,92,246,0.2), transparent);
  }
  .cust-timeline-item {
    position: relative; padding: 0.6rem 0 0.6rem 1rem;
    animation: timelineReveal 0.5s ease-out both;
  }
  .cust-timeline-dot {
    position: absolute; left: -1.75rem; top: 50%; transform: translateY(-50%);
    width: 12px; height: 12px; border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border: 2px solid rgba(15,23,42,0.8); z-index: 1;
    transition: all 0.3s ease;
  }
  .cust-timeline-item:hover .cust-timeline-dot {
    transform: translateY(-50%) scale(1.3); box-shadow: 0 0 12px rgba(59,130,246,0.5);
  }
  .cust-timeline-content {
    background: rgba(30,41,59,0.4); border-radius: 10px;
    padding: 0.7rem 1rem; border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.3s ease;
  }
  .cust-timeline-content:hover {
    background: rgba(30,41,59,0.6); border-color: rgba(59,130,246,0.12);
    transform: translateX(4px);
  }
  .cust-timeline-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 0.25rem;
  }
  .cust-timeline-product { font-size: 13px; font-weight: 600; color: #e2e8f0; }
  .cust-timeline-amount { font-size: 13px; font-weight: 700; color: #4ade80; }
  .cust-timeline-meta {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 11px; color: rgba(148,163,184,0.5);
  }
  .cust-timeline-badge {
    background: rgba(59,130,246,0.12); color: #60a5fa;
    padding: 0.1rem 0.4rem; border-radius: 5px;
    font-size: 10px; font-weight: 600;
  }
  .cust-history-empty {
    padding: 2rem; text-align: center; color: rgba(148,163,184,0.4);
    font-size: 13px; background: rgba(30,41,59,0.3); border-radius: 12px;
  }

  /* ===== MODAL ===== */
  .cust-modal-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    animation: overlayIn 0.3s ease-out both; padding: 2rem;
  }
  .cust-modal {
    width: 100%; max-width: 600px;
    background: linear-gradient(145deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%);
    border-radius: 24px; border: 1px solid rgba(59,130,246,0.15);
    backdrop-filter: blur(30px); position: relative; overflow: hidden;
    animation: modalIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both;
  }
  .cust-modal::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #22c55e, #3b82f6);
    background-size: 300% 100%; animation: gradientFlow 3s linear infinite;
  }
  .cust-modal-glow {
    position: absolute; top: -40%; right: -40%; width: 180%; height: 180%;
    background: radial-gradient(circle at 65% 25%, rgba(59,130,246,0.06) 0%, transparent 45%);
    pointer-events: none;
  }
  .cust-modal-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.5rem 1.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative; z-index: 1;
  }
  .cust-modal-title {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 1.15rem; font-weight: 700; color: #ffffff;
  }
  .cust-modal-title-icon {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    color: white; box-shadow: 0 4px 14px rgba(59,130,246,0.3);
  }
  .cust-modal-close {
    width: 34px; height: 34px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8; cursor: pointer; display: flex; align-items: center;
    justify-content: center; transition: all 0.3s ease;
  }
  .cust-modal-close:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: #f87171; transform: rotate(90deg); }
  .cust-modal-body { padding: 1.5rem 1.75rem; position: relative; z-index: 1; }
  .cust-modal-footer {
    padding: 1rem 1.75rem 1.5rem; display: flex; gap: 0.75rem;
    position: relative; z-index: 1;
  }
  .cust-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cust-form-group { margin-bottom: 1.15rem; }
  .cust-form-label {
    display: flex; align-items: center; gap: 0.35rem;
    font-size: 11.5px; font-weight: 700; color: rgba(148,163,184,0.85);
    margin-bottom: 0.45rem; text-transform: uppercase; letter-spacing: 0.6px;
    transition: color 0.3s ease;
  }
  .cust-form-label-icon { color: rgba(148,163,184,0.4); display: flex; transition: color 0.3s ease; }
  .cust-form-group:focus-within .cust-form-label { color: #60a5fa; }
  .cust-form-group:focus-within .cust-form-label-icon { color: #3b82f6; }
  .cust-required { color: #f87171; margin-left: 1px; }
  .cust-form-input {
    width: 100%; padding: 0.75rem 1rem; font-size: 14px;
    border-radius: 12px; border: 1.5px solid rgba(59,130,246,0.15);
    background: rgba(15,23,42,0.5); color: #e2e8f0;
    outline: none; transition: all 0.35s ease; box-sizing: border-box;
  }
  .cust-form-input::placeholder { color: rgba(148,163,184,0.35); }
  .cust-form-input:hover { border-color: rgba(59,130,246,0.3); background: rgba(15,23,42,0.6); }
  .cust-form-input:focus {
    border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
    background: rgba(15,23,42,0.7);
  }
  .cust-submit-btn {
    flex: 1; background: linear-gradient(135deg, #22c55e, #16a34a);
    border: none; padding: 0.8rem 1.5rem; border-radius: 12px;
    color: white; font-weight: 700; font-size: 14px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    box-shadow: 0 4px 18px rgba(34,197,94,0.35);
    position: relative; overflow: hidden;
  }
  .cust-submit-btn::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s ease;
  }
  .cust-submit-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(34,197,94,0.5); }
  .cust-submit-btn:not(:disabled):hover::before { left: 100%; }
  .cust-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .cust-submit-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
  .cust-cancel-btn {
    padding: 0.8rem 1.5rem; border-radius: 12px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8; font-weight: 600; font-size: 14px; cursor: pointer;
    transition: all 0.3s ease;
  }
  .cust-cancel-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #e2e8f0; }

  /* ===== EMPTY STATE ===== */
  .cust-empty {
    padding: 5rem 2rem; text-align: center; color: rgba(148,163,184,0.5);
  }
  .cust-empty-icon-wrap {
    width: 80px; height: 80px; border-radius: 22px;
    background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem; border: 1px solid rgba(59,130,246,0.15);
    animation: iconFloat 3s ease-in-out infinite;
  }
  .cust-empty-title { font-size: 1.2rem; font-weight: 700; color: rgba(148,163,184,0.75); margin-bottom: 0.5rem; }
  .cust-empty-text { font-size: 0.9rem; color: rgba(148,163,184,0.45); margin-bottom: 1.5rem; }
  .cust-empty-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.5rem; border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white; font-weight: 700; font-size: 14px;
    border: none; cursor: pointer; box-shadow: 0 4px 18px rgba(59,130,246,0.35);
    transition: all 0.4s ease;
  }
  .cust-empty-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(59,130,246,0.5); }

  /* ===== LOADING ===== */
  .cust-loading-screen {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 80vh; gap: 1.5rem;
  }
  .cust-loading-logo { position: relative; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
  .cust-loading-ring {
    position: absolute; inset: 0; border: 3px solid rgba(59,130,246,0.15);
    border-top-color: #3b82f6; border-right-color: #8b5cf6;
    border-radius: 50%; animation: spin 1.2s cubic-bezier(0.5,0,0.5,1) infinite;
  }
  .cust-loading-ring-inner {
    position: absolute; inset: 10px; border: 2px solid rgba(139,92,246,0.1);
    border-bottom-color: #8b5cf6; border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.5,0,0.5,1) infinite reverse;
  }
  .cust-loading-center { color: #60a5fa; font-size: 1.5rem; animation: breathe 1.5s ease-in-out infinite; display: flex; }
  .cust-loading-dots { display: flex; gap: 0.4rem; }
  .cust-loading-dot { width: 8px; height: 8px; border-radius: 50%; animation: dotPulse 1.4s ease-in-out infinite; }
  .cust-loading-dot:nth-child(1) { background: #3b82f6; }
  .cust-loading-dot:nth-child(2) { background: #8b5cf6; animation-delay: 0.2s; }
  .cust-loading-dot:nth-child(3) { background: #22c55e; animation-delay: 0.4s; }
  .cust-loading-text { color: rgba(148,163,184,0.7); font-size: 14px; font-weight: 500; }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1100px) {
    .cust-stats { grid-template-columns: repeat(2, 1fr); }
    .cust-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
    .cust-filters-grid { grid-template-columns: repeat(2, 1fr); }
    .cust-detail-cards { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .cust-root { padding: 1rem; }
    .cust-header { flex-direction: column; gap: 1rem; align-items: flex-start; }
    .cust-stats { grid-template-columns: 1fr 1fr; }
    .cust-toolbar { flex-direction: column; }
    .cust-search-wrap { max-width: 100%; }
    .cust-grid { grid-template-columns: 1fr; }
    .cust-form-row { grid-template-columns: 1fr; }
    .cust-filters-grid { grid-template-columns: 1fr; }
    .cust-detail-cards { grid-template-columns: 1fr; }
  }
`;

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const CUSTOMER_COLORS = [
  { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', glow: '#3b82f6', light: 'rgba(59,130,246,0.1)', text: '#60a5fa' },
  { bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', glow: '#8b5cf6', light: 'rgba(139,92,246,0.1)', text: '#a78bfa' },
  { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', glow: '#22c55e', light: 'rgba(34,197,94,0.1)', text: '#4ade80' },
  { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: '#f59e0b', light: 'rgba(245,158,11,0.1)', text: '#fbbf24' },
  { bg: 'linear-gradient(135deg, #ec4899, #db2777)', glow: '#ec4899', light: 'rgba(236,72,153,0.1)', text: '#f472b6' },
  { bg: 'linear-gradient(135deg, #06b6d4, #0891b2)', glow: '#06b6d4', light: 'rgba(6,182,212,0.1)', text: '#22d3ee' },
  { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', glow: '#ef4444', light: 'rgba(239,68,68,0.1)', text: '#f87171' },
  { bg: 'linear-gradient(135deg, #14b8a6, #0d9488)', glow: '#14b8a6', light: 'rgba(20,184,166,0.1)', text: '#2dd4bf' },
];

const CONFETTI_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
}

function AnimatedCounter({ value, duration = 1400, isCurrency = false }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);
  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    if (target === 0) { setDisplay(0); return; }
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(eased * target);
      if (p < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value, duration]);
  if (isCurrency) return <span>{formatCurrency(display)}</span>;
  return <span>{Math.floor(display).toLocaleString()}</span>;
}

function MiniSparkline({ color, delay = 0 }) {
  const bars = [30, 55, 40, 75, 45, 85, 55, 48, 70, 62];
  return (
    <div className="cust-stat-spark" style={{ color }}>
      {bars.map((h, i) => (
        <div key={i} className="cust-spark-bar"
          style={{ height: `${h}%`, background: color, animationDelay: `${delay + i * 0.05}s`, opacity: 0.3 + (h / 100) * 0.5 }}
        />
      ))}
    </div>
  );
}

function ConfettiBurst() {
  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="cust-confetti"
          style={{
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            left: `${8 + Math.random() * 84}%`,
            top: `${-5 + Math.random() * 10}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${0.7 + Math.random() * 0.6}s`,
          }}
        />
      ))}
    </>
  );
}

function getCustomerTier(spent) {
  if (spent >= 10000) return { label: 'Gold', class: 'cust-tier-gold', icon: <HiOutlineStar size={10} /> };
  if (spent >= 5000) return { label: 'Silver', class: 'cust-tier-silver', icon: <HiOutlineCheckBadge size={10} /> };
  if (spent >= 1000) return { label: 'Bronze', class: 'cust-tier-bronze', icon: <HiOutlineFire size={10} /> };
  return { label: 'New', class: 'cust-tier-new', icon: <HiOutlineSparkles size={10} /> };
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function getColor(i) { return CUSTOMER_COLORS[i % CUSTOMER_COLORS.length]; }

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [filterCity, setFilterCity] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [minSpent, setMinSpent] = useState('');
  const [maxSpent, setMaxSpent] = useState('');
  const [minOrders, setMinOrders] = useState('');
  const [maxOrders, setMaxOrders] = useState('');

  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', address: '', city: '', country: '',
  });

  const nameInputRef = useRef(null);

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    try {
      setLoading(prev => customers.length === 0 ? true : prev);
      setRefreshing(true);
      const res = await fetch('/api/customers');
      const result = await res.json();
      if (result.success) setCustomers(result.data || []);
      else throw new Error(result.message);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); setRefreshing(false); }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      if (!formData.customerName.trim()) throw new Error('Customer name is required');
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setSuccess('Customer added successfully!');
      setNewlyAddedId(result.data?.CustomerID || null);
      setFormData({ customerName: '', email: '', phone: '', address: '', city: '', country: '' });
      setShowModal(false);
      fetchCustomers();
      setTimeout(() => { setSuccess(null); setNewlyAddedId(null); }, 4000);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  function openModal() {
    setShowModal(true); setError(null);
    setTimeout(() => nameInputRef.current?.focus(), 300);
  }
  function closeModal() {
    setShowModal(false);
    setFormData({ customerName: '', email: '', phone: '', address: '', city: '', country: '' });
    setError(null);
  }

  const activeFiltersCount = [filterCity, filterCountry, minSpent, maxSpent, minOrders, maxOrders].filter(Boolean).length;

  const uniqueCities = [...new Set(customers.map(c => c.City).filter(Boolean))].sort();
  const uniqueCountries = [...new Set(customers.map(c => c.Country).filter(Boolean))].sort();

  function clearFilters() {
    setFilterCity(''); setFilterCountry('');
    setMinSpent(''); setMaxSpent('');
    setMinOrders(''); setMaxOrders('');
  }

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    const matchesSearch = !search ||
      (c.CustomerName || '').toLowerCase().includes(q) ||
      (c.Email || '').toLowerCase().includes(q) ||
      (c.Phone || '').toLowerCase().includes(q) ||
      (c.City || '').toLowerCase().includes(q);
    const matchesCity = !filterCity || (c.City || '').toLowerCase() === filterCity.toLowerCase();
    const matchesCountry = !filterCountry || (c.Country || '').toLowerCase() === filterCountry.toLowerCase();
    const spent = parseFloat(c.TotalSpent) || 0;
    const orders = parseInt(c.TotalOrders) || 0;
    const matchesSpent = (!minSpent || spent >= +minSpent) && (!maxSpent || spent <= +maxSpent);
    const matchesOrders = (!minOrders || orders >= +minOrders) && (!maxOrders || orders <= +maxOrders);
    return matchesSearch && matchesCity && matchesCountry && matchesSpent && matchesOrders;
  });

  const totalRevenue = customers.reduce((s, c) => s + parseFloat(c.TotalSpent || 0), 0);
  const totalOrders = customers.reduce((s, c) => s + parseInt(c.TotalOrders || 0), 0);
  const avgSpend = customers.length ? totalRevenue / customers.length : 0;
  const maxSpendCustomer = customers.reduce((a, b) => (parseFloat(a?.TotalSpent || 0) > parseFloat(b?.TotalSpent || 0) ? a : b), customers[0]);

  if (loading && customers.length === 0) {
    return (
      <div className="cust-root">
        <style>{globalCSS}</style>
        <div className="cust-orb cust-orb-1" /><div className="cust-orb cust-orb-2" />
        <div className="cust-loading-screen">
          <div className="cust-loading-logo">
            <div className="cust-loading-ring" /><div className="cust-loading-ring-inner" />
            <span className="cust-loading-center"><HiOutlineUserGroup size={28} /></span>
          </div>
          <div className="cust-loading-dots">
            <span className="cust-loading-dot" /><span className="cust-loading-dot" /><span className="cust-loading-dot" />
          </div>
          <p className="cust-loading-text">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cust-root">
      <style>{globalCSS}</style>
      <div className="cust-orb cust-orb-1" /><div className="cust-orb cust-orb-2" /><div className="cust-orb cust-orb-3" />

      <div className="cust-content">
        {/* ═══ HEADER ═══ */}
        <header className="cust-header">
          <div className="cust-header-glow" />
          <div className="cust-header-left">
            <div className="cust-header-top">
              <div className="cust-header-icon"><HiOutlineUserGroup size={23} /></div>
              <h1 className="cust-header-title">Customers</h1>
            </div>
            <p className="cust-header-subtitle">
              <span className="cust-status-dot" />
              <span>Manage your customer base & purchase history</span>
            </p>
          </div>
          <div className="cust-header-actions">
            <button className="cust-refresh-btn" onClick={fetchCustomers} title="Refresh">
              <span className="cust-refresh-icon" style={refreshing ? { animation: 'spin 1s linear infinite' } : {}}>
                <HiOutlineArrowPath size={17} />
              </span>
            </button>
            <button className="cust-add-btn" onClick={openModal}>
              <HiOutlineUserPlus size={17} /> Add Customer
            </button>
          </div>
        </header>

        {/* Wave */}
        <div className="cust-wave">
          <svg className="cust-wave-svg" viewBox="0 0 1000 25" preserveAspectRatio="none">
            <path d="M0,12 C150,25 350,0 500,12 C650,25 850,0 1000,12 L1000,25 L0,25 Z" fill="rgba(59,130,246,0.25)" />
            <path d="M0,18 C200,5 300,22 500,18 C700,14 800,24 1000,18 L1000,25 L0,25 Z" fill="rgba(139,92,246,0.15)" />
          </svg>
        </div>

        {/* ═══ ALERTS ═══ */}
        {success && (
          <div className="cust-alert cust-alert-success">
            <ConfettiBurst />
            <HiOutlineCheckCircle size={19} /> {success}
            <HiOutlineRocketLaunch size={15} style={{ opacity: 0.6 }} />
            <button className="cust-alert-close" onClick={() => setSuccess(null)}><HiOutlineXMark size={15} /></button>
          </div>
        )}
        {error && !showModal && (
          <div className="cust-alert cust-alert-error">
            <HiOutlineExclamationTriangle size={19} /> {error}
            <button className="cust-alert-close" onClick={() => setError(null)}><HiOutlineXMark size={15} /></button>
          </div>
        )}

        {/* ═══ STATS ═══ */}
        <div className="cust-stats">
          {[
            { icon: <HiOutlineUserGroup size={20} />, label: 'Total Customers', value: customers.length, gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', glow: '#3b82f6', sparkColor: '#60a5fa', delay: 0.5 },
            { icon: <HiOutlineBanknotes size={20} />, label: 'Total Revenue', value: totalRevenue, isCurrency: true, gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', glow: '#22c55e', sparkColor: '#4ade80', delay: 0.6, trend: '+12.5%', trendUp: true },
            { icon: <HiOutlineShoppingCart size={20} />, label: 'Total Orders', value: totalOrders, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', glow: '#8b5cf6', sparkColor: '#a78bfa', delay: 0.7 },
            { icon: <HiOutlineChartBar size={20} />, label: 'Avg. Spend / Customer', value: avgSpend, isCurrency: true, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: '#f59e0b', sparkColor: '#fbbf24', delay: 0.8 },
          ].map((stat, i) => (
            <div key={i} className="cust-stat-card anim-entry" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className="cust-stat-glow" style={{ background: stat.glow }} />
              <div className="cust-stat-top">
                <div className="cust-stat-icon" style={{ background: stat.gradient }}>{stat.icon}</div>
                <MiniSparkline color={stat.sparkColor} delay={stat.delay} />
              </div>
              <div className="cust-stat-value">
                <AnimatedCounter value={stat.value} isCurrency={stat.isCurrency} duration={1200 + i * 200} />
              </div>
              <div className="cust-stat-label">{stat.label}</div>
              {stat.trend && (
                <span className={`cust-stat-trend ${stat.trendUp ? 'cust-trend-up' : 'cust-trend-down'}`}>
                  {stat.trendUp ? <HiOutlineArrowTrendingUp size={10} /> : null} {stat.trend}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ═══ TOOLBAR ═══ */}
        <div className="cust-toolbar anim-entry" style={{ animationDelay: '0.4s' }}>
          <div className="cust-search-wrap">
            <span className="cust-search-icon"><HiOutlineMagnifyingGlass size={16} /></span>
            <input type="text" className="cust-search" placeholder="Search customers..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <span className="cust-search-count">{filtered.length}/{customers.length}</span>
          </div>
          <div className="cust-toolbar-right">
            <div className="cust-view-toggle">
              <button className={`cust-view-btn ${viewMode === 'grid' ? 'cust-view-btn-active' : ''}`}
                onClick={() => setViewMode('grid')} title="Grid View"><HiOutlineSquares2X2 size={16} /></button>
              <button className={`cust-view-btn ${viewMode === 'list' ? 'cust-view-btn-active' : ''}`}
                onClick={() => setViewMode('list')} title="List View"><HiOutlineListBullet size={16} /></button>
            </div>
            <button className={`cust-filter-btn ${showFilters ? 'cust-filter-btn-active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}>
              <HiOutlineAdjustmentsHorizontal size={14} /> Filters
              {activeFiltersCount > 0 && <span className="cust-filter-badge">{activeFiltersCount}</span>}
            </button>
          </div>
        </div>

        {/* ═══ FILTER PANEL ═══ */}
        <div className={`cust-filters-panel ${showFilters ? 'cust-filters-panel-visible' : 'cust-filters-panel-hidden'}`}>
          <div className="cust-filters-inner">
            <div className="cust-filters-grid">
              <div className="cust-filter-group">
                <label className="cust-filter-label"><HiOutlineMapPin size={11} /> City</label>
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="cust-filter-select">
                  <option value="">All Cities</option>
                  {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="cust-filter-group">
                <label className="cust-filter-label"><HiOutlineGlobeAlt size={11} /> Country</label>
                <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} className="cust-filter-select">
                  <option value="">All Countries</option>
                  {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="cust-filter-group">
                <label className="cust-filter-label"><HiOutlineBanknotes size={11} /> Total Spent Range</label>
                <div className="cust-range-inputs">
                  <input type="number" placeholder="Min" value={minSpent} onChange={e => setMinSpent(e.target.value)}
                    className="cust-filter-input" min="0" step="0.01" />
                  <span className="cust-range-sep">→</span>
                  <input type="number" placeholder="Max" value={maxSpent} onChange={e => setMaxSpent(e.target.value)}
                    className="cust-filter-input" min="0" step="0.01" />
                </div>
              </div>
            </div>
            <div className="cust-filters-footer">
              <button className="cust-clear-btn" onClick={clearFilters}>
                <HiOutlineXMark size={12} /> Clear All
              </button>
              <div className="cust-filter-results">
                <HiOutlineEye size={12} /> Showing {filtered.length} of {customers.length}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ GRID VIEW ═══ */}
        {viewMode === 'grid' && filtered.length > 0 && (
          <div className="cust-grid">
            {filtered.map((customer, i) => {
              const color = getColor(i);
              const tier = getCustomerTier(parseFloat(customer.TotalSpent || 0));
              const isNew = customer.CustomerID === newlyAddedId;
              return (
                <div key={customer.CustomerID}
                  className={`cust-card anim-entry ${isNew ? 'cust-tr-new' : ''}`}
                  style={{ animationDelay: `${0.45 + i * 0.06}s` }}
                  onClick={() => setExpandedCustomer(expandedCustomer === customer.CustomerID ? null : customer.CustomerID)}
                >
                  <div className="cust-card-glow" style={{ background: color.glow }} />
                  <button className="cust-card-menu" onClick={e => e.stopPropagation()}>
                    <HiOutlineEllipsisHorizontal size={15} />
                  </button>
                  <div className="cust-card-header">
                    <div className="cust-card-avatar" style={{ background: color.bg }}>
                      {getInitials(customer.CustomerName)}
                      <span className="cust-card-avatar-badge" />
                    </div>
                    <div className="cust-card-info">
                      <div className="cust-card-name">{customer.CustomerName}</div>
                      <div className="cust-card-id">#{customer.CustomerID}</div>
                      {(customer.City || customer.Country) && (
                        <div className="cust-card-location">
                          <HiOutlineMapPin size={11} />
                          {[customer.City, customer.Country].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="cust-card-body">
                    <div className="cust-card-contacts">
                      {customer.Email && (
                        <div className="cust-card-contact">
                          <HiOutlineEnvelope size={12} /> {customer.Email}
                        </div>
                      )}
                      {customer.Phone && (
                        <div className="cust-card-contact">
                          <HiOutlinePhone size={12} /> {customer.Phone}
                        </div>
                      )}
                    </div>
                    <div className="cust-card-stats">
                      <div className="cust-card-stat" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 10 }}>
                        <div className="cust-card-stat-value">{customer.TotalOrders || 0}</div>
                        <div className="cust-card-stat-label" style={{ color: '#a78bfa' }}>Orders</div>
                      </div>
                      <div className="cust-card-stat" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 10 }}>
                        <div className="cust-card-stat-value">{formatCurrency(customer.TotalSpent)}</div>
                        <div className="cust-card-stat-label" style={{ color: '#4ade80' }}>Spent</div>
                      </div>
                    </div>
                  </div>
                  <div className="cust-card-footer">
                    <div className="cust-card-date">
                      <HiOutlineCalendarDays size={11} />
                      {customer.LastPurchaseDate ? new Date(customer.LastPurchaseDate).toLocaleDateString() : 'Never'}
                    </div>
                    <span className={`cust-card-tier ${tier.class}`}>
                      {tier.icon} {tier.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ LIST VIEW ═══ */}
        {viewMode === 'list' && filtered.length > 0 && (
          <div className="cust-list-card anim-entry" style={{ animationDelay: '0.45s' }}>
            <div className="cust-list-header">
              <div className="cust-list-title">
                <span className="cust-list-title-icon"><HiOutlineUserGroup size={17} /></span>
                All Customers
              </div>
              <span className="cust-list-count">{filtered.length}</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="cust-table">
                <thead>
                  <tr>
                    <th className="cust-th" style={{ width: 40 }} />
                    <th className="cust-th">Customer</th>
                    <th className="cust-th">Location</th>
                    <th className="cust-th">Orders</th>
                    <th className="cust-th">Total Spent</th>
                    <th className="cust-th">Tier</th>
                    <th className="cust-th" style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((customer, i) => {
                    const color = getColor(i);
                    const tier = getCustomerTier(parseFloat(customer.TotalSpent || 0));
                    const isExp = expandedCustomer === customer.CustomerID;
                    const isNew = customer.CustomerID === newlyAddedId;
                    return (
                      <React.Fragment key={customer.CustomerID}>
                        <tr className={`cust-tr ${isNew ? 'cust-tr-new' : ''}`}
                          onClick={() => setExpandedCustomer(isExp ? null : customer.CustomerID)}
                          style={{ background: isExp ? 'rgba(59,130,246,0.04)' : undefined }}
                        >
                          <td className="cust-td" style={{ color: '#60a5fa' }}>
                            {isExp ? <HiOutlineChevronDown size={14} /> : <HiOutlineChevronRight size={14} />}
                          </td>
                          <td className="cust-td">
                            <div className="cust-tr-cell">
                              <div className="cust-tr-avatar" style={{ background: color.bg }}>
                                {getInitials(customer.CustomerName)}
                              </div>
                              <div className="cust-tr-info">
                                <div className="cust-tr-name">{customer.CustomerName}</div>
                                <div className="cust-tr-email">{customer.Email || customer.Phone || '—'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="cust-td">
                            {customer.City || customer.Country ? (
                              <span className="cust-tr-location">
                                <HiOutlineMapPin size={12} />
                                {[customer.City, customer.Country].filter(Boolean).join(', ')}
                              </span>
                            ) : <span style={{ color: 'rgba(148,163,184,0.4)' }}>—</span>}
                          </td>
                          <td className="cust-td">
                            <span className="cust-tr-badge cust-badge-orders">
                              <HiOutlineShoppingCart size={11} /> {customer.TotalOrders || 0}
                            </span>
                          </td>
                          <td className="cust-td">
                            <span className="cust-tr-badge cust-badge-spent">
                              <HiOutlineBanknotes size={11} /> {formatCurrency(customer.TotalSpent)}
                            </span>
                          </td>
                          <td className="cust-td">
                            <span className={`cust-card-tier ${tier.class}`}>
                              {tier.icon} {tier.label}
                            </span>
                          </td>
                          <td className="cust-td" style={{ textAlign: 'right' }}>
                            <div className="cust-tr-actions" style={{ justifyContent: 'flex-end' }}>
                              <button className="cust-tr-action" title="View" onClick={e => e.stopPropagation()}>
                                <HiOutlineEye size={14} />
                              </button>
                              <button className="cust-tr-action" title="Edit" onClick={e => e.stopPropagation()}>
                                <HiOutlinePencilSquare size={14} />
                              </button>
                              <button className="cust-tr-action cust-tr-action-delete" title="Delete" onClick={e => e.stopPropagation()}>
                                <HiOutlineTrash size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row */}
                        {isExp && (
                          <tr>
                            <td colSpan={7} className="cust-expanded">
                              <div className="cust-expanded-inner">
                                <div className="cust-detail-cards">
                                  {[
                                    { label: 'Email', value: customer.Email },
                                    { label: 'Phone', value: customer.Phone },
                                    { label: 'Address', value: customer.Address },
                                    { label: 'Customer Since', value: customer.CreatedAt ? new Date(customer.CreatedAt).toLocaleDateString() : '—' },
                                  ].map((d, j) => (
                                    <div key={j} className="cust-detail-card">
                                      <div className="cust-detail-label">{d.label}</div>
                                      <div className="cust-detail-value">{d.value || '—'}</div>
                                    </div>
                                  ))}
                                </div>
                                <div className="cust-history-section">
                                  <div className="cust-history-title">
                                    <span className="cust-history-title-icon"><HiOutlineDocumentText size={15} /></span>
                                    Purchase History
                                  </div>
                                  {customer.purchaseHistory && customer.purchaseHistory.length > 0 ? (
                                    <div className="cust-timeline">
                                      {customer.purchaseHistory.slice(0, 5).map((item, idx) => (
                                        <div key={idx} className="cust-timeline-item" style={{ animationDelay: `${0.1 + idx * 0.08}s` }}>
                                          <div className="cust-timeline-dot" />
                                          <div className="cust-timeline-content">
                                            <div className="cust-timeline-top">
                                              <span className="cust-timeline-product">{item.ProductName}</span>
                                              <span className="cust-timeline-amount">{formatCurrency(item.LineTotal)}</span>
                                            </div>
                                            <div className="cust-timeline-meta">
                                              <span className="cust-timeline-badge">{item.InvoiceNumber}</span>
                                              <span>{new Date(item.SaleDate).toLocaleDateString()}</span>
                                              <span>×{item.Quantity}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="cust-history-empty">
                                      <HiOutlineShoppingCart size={20} style={{ marginBottom: 8, opacity: 0.4 }} /><br />
                                      No purchase history yet
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ EMPTY ═══ */}
        {filtered.length === 0 && (
          <div className="cust-list-card anim-entry" style={{ animationDelay: '0.3s' }}>
            <div className="cust-empty">
              <div className="cust-empty-icon-wrap">
                {search || activeFiltersCount ? <HiOutlineMagnifyingGlass size={32} style={{ color: '#60a5fa' }} /> : <HiOutlineUserGroup size={32} style={{ color: '#60a5fa' }} />}
              </div>
              <h3 className="cust-empty-title">{search || activeFiltersCount ? 'No customers found' : 'No customers yet'}</h3>
              <p className="cust-empty-text">
                {search || activeFiltersCount
                  ? 'Try adjusting your search or filters.'
                  : 'Add your first customer to start building relationships.'}
              </p>
              {!search && activeFiltersCount === 0 && (
                <button className="cust-empty-btn" onClick={openModal}>
                  <HiOutlineUserPlus size={17} /> Add First Customer
                </button>
              )}
              {(search || activeFiltersCount > 0) && (
                <button className="cust-empty-btn" onClick={() => { setSearch(''); clearFilters(); }}
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <HiOutlineXMark size={17} /> Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══ ADD CUSTOMER MODAL ═══ */}
        {showModal && (
          <div className="cust-modal-overlay" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="cust-modal">
              <div className="cust-modal-glow" />
              <div className="cust-modal-header">
                <div className="cust-modal-title">
                  <div className="cust-modal-title-icon"><HiOutlineUserPlus size={18} /></div>
                  Add New Customer
                </div>
                <button className="cust-modal-close" onClick={closeModal}><HiOutlineXMark size={16} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="cust-modal-body">
                  {error && (
                    <div className="cust-alert cust-alert-error" style={{ marginBottom: '1rem' }}>
                      <HiOutlineExclamationTriangle size={17} /> {error}
                    </div>
                  )}
                  <div className="cust-form-row">
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlineUserGroup size={12} /></span>
                        Customer Name <span className="cust-required">*</span>
                      </label>
                      <input ref={nameInputRef} type="text" name="customerName" className="cust-form-input"
                        placeholder="John Doe" value={formData.customerName} onChange={handleChange} required />
                    </div>
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlineEnvelope size={12} /></span>
                        Email
                      </label>
                      <input type="email" name="email" className="cust-form-input"
                        placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="cust-form-row">
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlinePhone size={12} /></span>
                        Phone
                      </label>
                      <input type="text" name="phone" className="cust-form-input"
                        placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlineMapPin size={12} /></span>
                        City
                      </label>
                      <input type="text" name="city" className="cust-form-input"
                        placeholder="New York" value={formData.city} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="cust-form-row">
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlineGlobeAlt size={12} /></span>
                        Country
                      </label>
                      <input type="text" name="country" className="cust-form-input"
                        placeholder="United States" value={formData.country} onChange={handleChange} />
                    </div>
                    <div className="cust-form-group">
                      <label className="cust-form-label">
                        <span className="cust-form-label-icon"><HiOutlineBuildingOffice size={12} /></span>
                        Address
                      </label>
                      <input type="text" name="address" className="cust-form-input"
                        placeholder="123 Main St" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="cust-modal-footer">
                  <button type="submit" className="cust-submit-btn" disabled={submitting}>
                    {submitting ? <><div className="cust-submit-spinner" /> Adding...</> : <><HiOutlinePlusCircle size={17} /> Add Customer</>}
                  </button>
                  <button type="button" className="cust-cancel-btn" onClick={closeModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}