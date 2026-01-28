-- ZONES
INSERT INTO zone (id, name) VALUES ('LONDON_CENTRAL', 'London Central');
INSERT INTO zone (id, name) VALUES ('LONDON_NORTH', 'London North');

-- HOSPITALS
INSERT INTO hospital (id, name, zone_id, available_beds) VALUES
('HOSP-001', 'St Mary Hospital', 'LONDON_CENTRAL', 5),
('HOSP-002', 'Royal London Hospital', 'LONDON_CENTRAL', 0),
('HOSP-003', 'North General Hospital', 'LONDON_NORTH', 3);

-- HOSPITAL SPECIALITIES
INSERT INTO hospital_speciality (hospital_id, speciality) VALUES
('HOSP-001', 'Cardiologie'),
('HOSP-001', 'Médecine d urgence'),
('HOSP-002', 'Cardiologie'),
('HOSP-003', 'Neurologie'),
('HOSP-003', 'Médecine d urgence');
