import { LabResource } from '@/types/dashboard';

export const MOCK_LAB_RESOURCES: LabResource[] = [
  { id: 'lab-001', name: 'Digital Oscilloscope (200 MHz)', type: 'Electronics', quantity: 12, available: 9, lastMaintenance: '2025-04-10', location: 'Electronics Lab (401)', description: 'Rigol DS1202Z-E digital oscilloscopes for circuit analysis.' },
  { id: 'lab-002', name: 'Compound Microscope', type: 'Biology', quantity: 30, available: 24, lastMaintenance: '2025-03-20', location: 'Biology Lab (302)', description: 'Olympus CX23 binocular compound microscopes with 4x–100x zoom.' },
  { id: 'lab-003', name: 'Bunsen Burner Set', type: 'Chemistry', quantity: 20, available: 18, lastMaintenance: '2025-04-01', location: 'Chemistry Lab (303)', description: 'Natural gas Bunsen burners with heat-resistant stands and iron rings.' },
  { id: 'lab-004', name: 'Raspberry Pi 4 (4GB)', type: 'Computer Science', quantity: 24, available: 20, lastMaintenance: '2025-05-01', location: 'Computer Lab 1 (102)', description: 'Raspberry Pi 4 Model B units for IoT and programming projects.' },
  { id: 'lab-005', name: 'Physics Force Sensor Kit', type: 'Physics', quantity: 15, available: 13, lastMaintenance: '2025-02-15', location: 'Physics Lab (304)', description: 'PASCO force sensors with data-logging software.' },
  { id: 'lab-006', name: 'Spectrometer (Prism)', type: 'Physics', quantity: 8, available: 6, lastMaintenance: '2025-01-20', location: 'Physics Lab (304)', description: 'Optical prism spectrometers for wavelength measurements.' },
  { id: 'lab-007', name: 'pH Meter (Digital)', type: 'Chemistry', quantity: 10, available: 10, lastMaintenance: '2025-05-05', location: 'Chemistry Lab (303)', description: 'Hanna Instruments HI98108 waterproof digital pH meters.' },
  { id: 'lab-008', name: 'VR Headset (Oculus Quest 2)', type: 'Technology', quantity: 6, available: 4, lastMaintenance: '2025-04-20', location: 'Innovation Lab (401)', description: 'Meta Quest 2 VR headsets for immersive learning experiences.' },
  { id: 'lab-009', name: 'Arduino Uno Kit (Full Set)', type: 'Electronics', quantity: 30, available: 22, lastMaintenance: '2025-05-10', location: 'Electronics Lab (401)', description: 'Arduino Uno starter kits with sensors, LEDs, and breadboards.' },
  { id: 'lab-010', name: 'Centrifuge Machine', type: 'Biology', quantity: 4, available: 3, lastMaintenance: '2025-03-01', location: 'Biology Lab (302)', description: 'REMI R-8C tabletop centrifuge for sample separation.' },
  { id: 'lab-011', name: 'Vernier Caliper (Digital)', type: 'Physics', quantity: 25, available: 25, lastMaintenance: '2025-04-15', location: 'Physics Lab (304)', description: 'Mitutoyo digital calipers for precision measurements.' },
  { id: 'lab-012', name: '3D Printer (FDM)', type: 'Technology', quantity: 3, available: 2, lastMaintenance: '2025-05-12', location: 'Innovation Lab (401)', description: 'Creality Ender 3 V2 FDM 3D printers for prototyping.' },
];
