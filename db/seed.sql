-- Sample crew for Monkey Limited Co.
TRUNCATE TABLE engineers RESTART IDENTITY;

INSERT INTO engineers (name, species, role, helmet_color, specialty, bananas_per_day, joined_date) VALUES
('Bonzo Vinelander',   'Chimpanzee',   'Structural Lead Engineer',     'red',   'Load-bearing branch calculations', 6, '2019-03-11'),
('Coco Steelbrow',     'Gorilla',      'Site Safety Officer',          'red',   'Hard-hat compliance & tree-fall audits', 5, '2020-07-02'),
('Nutsy Wrenchtail',   'Capuchin',     'Mechanical Engineer',          'green', 'Pulley systems & vine-tensioning rigs', 4, '2021-01-19'),
('Professor Peel',     'Orangutan',    'Environmental Engineer',       'green', 'Canopy stormwater & compost design', 3, '2018-11-05'),
('Banana Blueprints',  'Spider Monkey','Electrical Engineer',          'blue',  'Low-voltage jungle lighting grids', 5, '2022-04-27'),
('Sir Chatters',       'Macaque',      'Project Manager',              'blue',  'Keeping every banana on schedule', 4, '2017-09-14');
