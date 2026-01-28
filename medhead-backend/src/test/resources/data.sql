-- ZONES
INSERT INTO zone (code, lat, lon) VALUES
('LONDON_CENTRAL', 51.5074, -0.1278),
('LONDON_NORTH', 51.5200, -0.1400);

-- HOSPITALS
INSERT INTO hospital (id, name, available_beds, lat, lon) VALUES
('HOSP-001', 'St Mary Hospital', 5, 51.5080, -0.1281),
('HOSP-002', 'Royal London Hospital', 0, 51.5150, -0.1300),
('HOSP-003', 'North General Hospital', 3, 51.5250, -0.1350),
('HOSP-004', 'Emergency Hospital', 0, 51.5090, -0.1290);

-- SPECIALITIES
INSERT INTO hospital_speciality (hospital_id, speciality) VALUES
('HOSP-001', 'Cardiologie'),
('HOSP-001', 'Médecine d urgence'),
('HOSP-002', 'Cardiologie'),
('HOSP-003', 'Neurologie'),
('HOSP-003', 'Médecine d urgence'),
('HOSP-004', 'Cardiologie');
