import { useId } from 'react'
import { Button } from '@mui/material';
import Editor from '../../../Components/Editor';
import DashboardHeader from '../../../Components/DashboardHeader';
import './defaultSetting.css'

export default function DefaultSetting() {
  const id = useId();

  return (
    <main>
      <DashboardHeader title="Default Settings" />

      <div className="file-input">
        <label htmlFor={`${id}-invoice-file`}>Invoice / Itinerary logo</label>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{
            width: 'max-content',
            cursor: 'pointer',
            backgroundColor: '#4557fe',
            color: '#fff',
            padding: '0.5rem',
            boxShadow: 'none',
            borderRadius: '0.5rem',
            '&:hover': {
              backgroundColor: '#7f8aee',
              boxShadow: 'none'
            }
          }}
        >
          Upload file
          <input id={`${id}-invoice-file`} type="file" style={{ opacity: 0, width: 0, height: 0 }} />
        </Button>
      </div>

      <section>
        <h2 className="settings-heading2">Invoice terms and conditions</h2>

        <Editor />
      </section>

      <section>
        <h2 className="settings-heading2">Package terms and conditions</h2>

        <Editor />
      </section>
      
      <section>
        <h2 className="settings-heading2">Bank information</h2>

        <Editor />
      </section>

      <button className="submit-button">
        Save
      </button>
    </main>
  )
}
