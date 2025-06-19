import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 'APP001',
      type: "Ma'lumotnoma",
      status: 'Tasdiqlangan',
      date: '2024-03-10',
      description: "O'qish joyidan ma'lumotnoma",
    },
    {
      id: 'APP002',
      type: "Akademik ta'til",
      status: "Ko'rib chiqilmoqda",
      date: '2024-03-15',
      description: "Sog'liq bilan bog'liq akademik ta'til",
    },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [student] = useState({
    fullName: 'Eshmatov Toshmat',
    id: 'STU123',
    gpa: 3.8,
    course: 1,
  })

  const [form, setForm] = useState({
    type: '',
    description: '',
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (student.course !== 1) {
      toast.error(
        'Uzur, siz faqat 1-kurs talabasi sifatida ariza yuborishingiz mumkin.'
      )
      setModalOpen(false)
      return
    }

    const newApp = {
      id: `APP${Math.floor(Math.random() * 1000 + 3)}`,
      type: form.type,
      status: "Ko'rib chiqilmoqda",
      date: new Date().toISOString().slice(0, 10),
      description: form.description,
    }

    setApplications([...applications, newApp])
    setForm({ type: '', description: '' })
    toast.success('Ariza muvaffaqiyatli yuborildi!')
    setModalOpen(false)
  }

  return (
    <div className="relative">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Arizalar</h2>
          <button
            className="btn-primary flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="h-5 w-5" />
            <span>Yangi ariza</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-3 text-gray-600">ID</th>
                  <th className="p-3 text-gray-600">Ariza turi</th>
                  <th className="p-3 text-gray-600">Holati</th>
                  <th className="p-3 text-gray-600">Sana</th>
                  <th className="p-3 text-gray-600">Izoh</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 font-medium">{application.id}</td>
                    <td className="p-3">{application.type}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'Tasdiqlangan'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="p-3">{application.date}</td>
                    <td className="p-3">{application.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setModalOpen(false)}
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4">Yangi ariza</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ism Familiya
                </label>
                <input
                  type="text"
                  value={student.fullName}
                  disabled
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                <input
                  type="text"
                  value={student.id}
                  disabled
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA
                </label>
                <input
                  type="text"
                  value={student.gpa}
                  disabled
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ariza turi
                </label>
                <input
                  type="text"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Izoh
                </label>
                <textarea
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Yuborish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications
