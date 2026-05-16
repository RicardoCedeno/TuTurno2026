import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import specialtyRoutes from './routes/specialtyRoutes';
import cors from 'cors';
import doctorRoutes from './routes/DoctorRoutes';
import patientRoutes from './routes/PatientRoutes';
import officeRoutes from './routes/OfficeRoutes';
import locationRoutes from './routes/LocationRoutes';
import appointmentRoutes from './routes/AppointmentRoutes';
import appointmentCancellationRoutes from './routes/AppointmentCancellationRoutes';
import doctorAvailabilityRoutes from './routes/DoctorAvailabilityRoutes';
import doctorUnavailabilityRoutes from './routes/DoctorUnavailabilityRoutes';
import specialtyAIRoutes from './routes/AIRoutes/specialtyAIRoutes';

const app: Application = express();

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({ extended: true }));

// Basic request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', userRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/appointment-cancellations', appointmentCancellationRoutes);
app.use('/api/doctor-availability', doctorAvailabilityRoutes);
app.use('/api/doctor-unavailability', doctorUnavailabilityRoutes);
app.use('/api/ai/specialties', specialtyAIRoutes);


// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
