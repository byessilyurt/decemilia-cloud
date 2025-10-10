/*
  # Add Diverse Portfolio Projects
  
  1. Purpose
    - Add 5 new diverse sample projects showcasing various tech stacks
    - Include projects covering AI/ML, Web3, 3D graphics, and real-time collaboration
  
  2. Projects Added
    - NFT Marketplace (Web3, Blockchain)
    - 3D Portfolio Site (Three.js, WebGL)
    - Video Streaming Platform (WebRTC, Cloud)
    - ML Image Recognition (TensorFlow, Python)
    - Task Management Dashboard (Real-time, Collaboration)
  
  3. Technical Details
    - All projects include realistic tech stacks
    - High-quality Pexels images for thumbnails
    - Comprehensive content for detail pages
    - Featured flag for homepage highlighting
*/

-- Insert diverse sample projects
INSERT INTO projects (title, slug, description, tech_stack, demo_url, github_url, image_url, content, featured)
VALUES 
  (
    'NFT Marketplace',
    'nft-marketplace',
    'Decentralized marketplace for minting, buying, and selling NFTs with IPFS storage.',
    ARRAY['React', 'Web3.js', 'Solidity', 'IPFS', 'Ethereum', 'Hardhat'],
    'https://nft-market.example.com',
    'https://github.com/yourusername/nft-marketplace',
    'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# NFT Marketplace

A fully decentralized NFT marketplace built on Ethereum with IPFS storage.

## Features
- Mint NFTs directly from the platform
- Smart contract-powered transactions
- IPFS decentralized storage
- MetaMask integration
- Gas optimization for cost-effective minting
- Collection management

## Smart Contract Architecture
Built with Solidity using the ERC-721 standard, with custom extensions for royalties and batch minting.',
    true
  ),
  (
    '3D Portfolio Experience',
    '3d-portfolio',
    'Immersive 3D portfolio website with interactive animations and WebGL graphics.',
    ARRAY['Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'Blender'],
    'https://3d-portfolio.example.com',
    'https://github.com/yourusername/3d-portfolio',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# 3D Portfolio Experience

An immersive 3D portfolio website showcasing projects in a unique interactive environment.

## Technical Highlights
- Custom 3D models created in Blender
- Optimized WebGL rendering with Three.js
- Smooth animations using GSAP
- React Three Fiber integration
- Responsive 3D layout
- Physics-based interactions

## Performance
Achieved 60fps on most devices through aggressive optimization and LOD techniques.',
    true
  ),
  (
    'Video Streaming Platform',
    'video-streaming',
    'Scalable video streaming service with live broadcasting and adaptive bitrate streaming.',
    ARRAY['Next.js', 'WebRTC', 'AWS S3', 'CloudFront', 'FFmpeg', 'Node.js'],
    'https://stream.example.com',
    'https://github.com/yourusername/video-platform',
    'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# Video Streaming Platform

Enterprise-grade video streaming platform with live broadcasting capabilities.

## Architecture
- HLS adaptive streaming for optimal quality
- CDN integration with CloudFront
- WebRTC for ultra-low latency live streams
- Automated transcoding pipeline
- Real-time analytics dashboard

## Scale
Supports thousands of concurrent viewers with sub-second latency for live content.',
    false
  ),
  (
    'AI Image Recognition API',
    'ai-image-recognition',
    'Machine learning API for real-time image classification and object detection.',
    ARRAY['Python', 'TensorFlow', 'FastAPI', 'Docker', 'YOLO', 'OpenCV'],
    'https://vision-api.example.com',
    'https://github.com/yourusername/ai-vision',
    'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# AI Image Recognition API

Production-ready machine learning API for image classification and object detection.

## Models
- Custom-trained YOLOv8 for object detection
- ResNet-50 for image classification
- Real-time inference with GPU acceleration
- Batch processing support

## Performance
- 50ms average response time
- 95% accuracy on validation set
- Horizontal scaling with Kubernetes
- Edge deployment options

## API Features
RESTful endpoints with comprehensive documentation and client libraries.',
    true
  ),
  (
    'Collaborative Task Manager',
    'task-manager',
    'Real-time collaborative task management platform with team workspaces and analytics.',
    ARRAY['Next.js', 'Supabase', 'WebSockets', 'Prisma', 'Chart.js', 'Zustand'],
    'https://tasks.example.com',
    'https://github.com/yourusername/task-manager',
    'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# Collaborative Task Manager

Full-featured task management platform with real-time collaboration and advanced analytics.

## Features
- Real-time updates using Supabase Realtime
- Team workspaces and role-based permissions
- Advanced filtering and search
- Kanban and list views
- Time tracking and reporting
- Productivity analytics dashboard
- Integrations with Slack and GitHub

## Architecture
Built with Next.js 14 App Router, Supabase for backend, and Zustand for state management.

## Performance
Optimistic updates and intelligent caching provide instant feedback for all user actions.',
    false
  ),
  (
    'E-Commerce Dashboard with Stripe',
    'ecommerce-dashboard',
    'Modern admin dashboard for e-commerce with Stripe integration and analytics.',
    ARRAY['React', 'TypeScript', 'Stripe', 'Tailwind CSS', 'Recharts', 'Supabase'],
    'https://dashboard.example.com',
    'https://github.com/yourusername/ecommerce-dashboard',
    'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# E-Commerce Dashboard

Comprehensive admin dashboard for managing online stores with integrated payment processing.

## Key Features
- Real-time sales analytics
- Stripe payment integration
- Inventory management
- Customer relationship management
- Order processing workflow
- Revenue forecasting
- Automated report generation

## Payment Processing
Secure payment handling with Stripe, supporting multiple currencies and payment methods.

## Analytics
Beautiful data visualizations using Recharts with customizable dashboards and KPI tracking.',
    true
  );
