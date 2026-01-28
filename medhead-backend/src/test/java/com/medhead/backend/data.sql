-- ZONES
INSERT INTO zone (code, lat, lon) VALUES 
('LONDON_CENTRAL', 51.5074, -0.1278);

-- HOSPITALS
INSERT INTO hospital (id, name, available_beds, lat, lon) VALUES
('HOSP-001', 'Central Hospital', 5, 51.5080, -0.1281),
('HOSP-004', 'Emergency Hospital', 0, 51.5090, -0.1290);

-- SPECIALITIES
INSERT INTO hospital_speciality (hospital_id, speciality) VALUES
('HOSP-001', 'Cardiologie'),
('HOSP-004', 'Cardiologie');
