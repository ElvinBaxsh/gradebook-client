import { useState, useRef } from 'react';
import Layout from '../../layout/Layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, List, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule = () => {
  const [viewMode, setViewMode] = useState('timeGridWeek');
  const [currentTitle, setCurrentTitle] = useState('');
  const calendarRef = useRef(null);

  // Təqvim yüklənəndə və ya dəyişəndə başlığı (məs: Yanvar 2026) yeniləyir
  const handleDatesSet = (arg) => {
    setCurrentTitle(arg.view.title);
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  const toggleView = () => {
    const newView = viewMode === 'dayGridMonth' ? 'timeGridWeek' : 'dayGridMonth';
    setViewMode(newView);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  const events = [
    { 
      title: 'Frontend Development', 
      start: '2026-01-28T10:00:00', 
      end: '2026-01-28T11:30:00',
      backgroundColor: '#2563eb',
      borderColor: '#2563eb'
    },
    { 
      title: 'UI/UX Design', 
      start: '2026-01-29T14:00:00', 
      end: '2026-01-29T15:30:00',
      backgroundColor: '#7c3aed',
      borderColor: '#7c3aed'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        
        {/* Üst Filter və Naviqasiya Paneli */}
        <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tight shrink-0">Cədvəl</h1>
            
            {/* Tarix Keçid Düymələri */}
            <div className="flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
              <button onClick={handlePrev} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 text-sm font-black text-slate-700 min-w-[140px] text-center italic">
                {currentTitle}
              </span>
              <button onClick={handleNext} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            <button 
              onClick={handleTodayClick}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-slate-600 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
            >
              <Target size={14} /> Bugün
            </button>
            <div className="w-px h-6 bg-slate-100 mx-1"></div>
            <button 
              onClick={toggleView}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              {viewMode === 'dayGridMonth' ? <List size={14} /> : <CalendarIcon size={14} />}
              {viewMode === 'dayGridMonth' ? 'Həftəlik' : 'Aylıq'}
            </button>
          </div>
        </header>

        {/* Təqvim Sahəsi */}
        <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-sm border border-slate-100 senior-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={viewMode}
            headerToolbar={false}
            events={events}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            locale="az"
            firstDay={1}
            datesSet={handleDatesSet} // Tarix dəyişəndə başlığı yeniləyir
            eventClassNames="rounded-xl border-none p-2 text-[10px] font-bold shadow-sm"
            dayHeaderClassNames="text-slate-400 font-black uppercase text-[10px] py-4 border-none"
          />
        </div>
      </div>

      <style jsx global>{`
        .senior-calendar .fc { --fc-border-color: #f8fafc; --fc-today-bg-color: #f1f5f9; font-family: inherit; }
        .senior-calendar .fc-scrollgrid { border-radius: 30px; overflow: hidden; border: 1px solid #f1f5f9 !important; }
        .senior-calendar .fc-col-header-cell { background: #fff; border-bottom: 1px solid #f1f5f9 !important; }
        .senior-calendar .fc-timegrid-slot-label { font-size: 10px; font-weight: 800; color: #cbd5e1; text-transform: uppercase; }
        .senior-calendar .fc-event { border-radius: 12px !important; }
      `}</style>
    </Layout>
  );
};

export default Schedule;