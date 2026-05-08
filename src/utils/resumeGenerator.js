import jsPDF from 'jspdf'

export const generateResumePDF = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPosition = margin

  // Helper function to add text with word wrapping
  const addText = (text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + (lines.length * fontSize * 0.4)
  }

  // Header
  doc.setFillColor(99, 102, 241) // Accent color
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  yPosition = addText('MPHATSO GAMA', margin, 25, pageWidth - 2 * margin, 20, 'bold')
  yPosition = addText('ICT Professional & Full-Stack Developer', margin, yPosition + 5, pageWidth - 2 * margin, 12)

  // Reset text color
  doc.setTextColor(0, 0, 0)
  yPosition = 60

  // Contact Information
  doc.setFillColor(245, 245, 245)
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 25, 'F')
  
  yPosition = addText('Contact Information', margin + 5, yPosition + 5, pageWidth - 2 * margin, 12, 'bold')
  yPosition = addText('Email: mphatsotobiasg@gmail.com', margin + 5, yPosition + 3, pageWidth - 2 * margin, 10)
  yPosition = addText('Location: Blantyre, Malawi', margin + 5, yPosition + 3, pageWidth - 2 * margin, 10)
  yPosition = addText('GitHub: github.com/mrgamma26', margin + 5, yPosition + 3, pageWidth - 2 * margin, 10)

  yPosition += 15

  // Professional Summary
  yPosition = addText('PROFESSIONAL SUMMARY', margin, yPosition, pageWidth - 2 * margin, 14, 'bold')
  yPosition += 5
  const summary = 'BSc (Hons) Computer Science graduate with expertise in full-stack web development, ICT support, and systems analysis. Experienced in building secure, scalable digital solutions using modern technologies including React, PHP, MySQL, and cloud platforms. Strong background in service desk coordination and ITIL practices.'
  yPosition = addText(summary, margin, yPosition, pageWidth - 2 * margin, 10)
  yPosition += 10

  // Technical Skills
  yPosition = addText('TECHNICAL SKILLS', margin, yPosition, pageWidth - 2 * margin, 14, 'bold')
  yPosition += 5
  
  const skills = [
    'Frontend: React, JavaScript, HTML5, CSS3, Responsive Design',
    'Backend: PHP, Node.js, RESTful APIs, Database Design',
    'Database: MySQL, MongoDB, Data Normalization',
    'Tools: Git, Docker, Linux, Windows Server',
    'Cloud: AWS, Digital Ocean, Vercel',
    'Other: ITIL, Service Desk, Network Administration'
  ]
  
  skills.forEach(skill => {
    yPosition = addText(`• ${skill}`, margin + 5, yPosition, pageWidth - 2 * margin - 10, 10)
    yPosition += 2
  })
  yPosition += 10

  // Experience
  yPosition = addText('PROFESSIONAL EXPERIENCE', margin, yPosition, pageWidth - 2 * margin, 14, 'bold')
  yPosition += 5

  // Experience entries
  const experiences = [
    {
      title: 'ICT Support Specialist',
      company: 'Various Organizations',
      period: '2022 - Present',
      responsibilities: [
        'Provided technical support and troubleshooting for hardware and software issues',
        'Managed user accounts, permissions, and system access controls',
        'Implemented security protocols and data backup procedures',
        'Coordinated with vendors and managed IT inventory'
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: 'Freelance Projects',
      period: '2021 - Present',
      responsibilities: [
        'Developed responsive web applications using React and PHP',
        'Designed and implemented normalized database schemas',
        'Created secure authentication and authorization systems',
        'Deployed applications on cloud platforms with CI/CD pipelines'
      ]
    }
  ]

  experiences.forEach(exp => {
    if (yPosition > pageHeight - 60) {
      doc.addPage()
      yPosition = margin
    }
    
    yPosition = addText(`${exp.title} - ${exp.company}`, margin, yPosition, pageWidth - 2 * margin, 12, 'bold')
    yPosition = addText(exp.period, margin, yPosition + 2, pageWidth - 2 * margin, 10, 'italic')
    yPosition += 5
    
    exp.responsibilities.forEach(resp => {
      yPosition = addText(`• ${resp}`, margin + 5, yPosition, pageWidth - 2 * margin - 10, 10)
      yPosition += 2
    })
    yPosition += 8
  })

  // Education
  if (yPosition > pageHeight - 40) {
    doc.addPage()
    yPosition = margin
  }
  
  yPosition = addText('EDUCATION', margin, yPosition, pageWidth - 2 * margin, 14, 'bold')
  yPosition += 5
  yPosition = addText('BSc (Hons) Computer Science', margin, yPosition, pageWidth - 2 * margin, 12, 'bold')
  yPosition = addText('NACIT (National College of Information Technology)', margin, yPosition + 2, pageWidth - 2 * margin, 10)
  yPosition = addText('Graduated with Honours', margin, yPosition + 2, pageWidth - 2 * margin, 10)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('Generated from portfolio website - https://my-portfolio-omega-lovat-90.vercel.app', 
           pageWidth / 2, pageHeight - 10, { align: 'center' })

  // Save the PDF
  doc.save('Mphatso_Gama_Resume.pdf')
}

export const generateCoverLetter = (jobTitle = 'Software Developer', companyName = 'Your Company') => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = margin

  // Helper function
  const addText = (text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + (lines.length * fontSize * 0.4)
  }

  // Header
  yPosition = addText('MPHATSO GAMA', margin, yPosition, pageWidth - 2 * margin, 16, 'bold')
  yPosition = addText('ICT Professional & Full-Stack Developer', margin, yPosition + 3, pageWidth - 2 * margin, 12)
  yPosition = addText('mphatsotobiasg@gmail.com | Blantyre, Malawi', margin, yPosition + 5, pageWidth - 2 * margin, 10)
  
  yPosition += 20

  // Date
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  yPosition = addText(today, margin, yPosition, pageWidth - 2 * margin, 10)
  yPosition += 15

  // Recipient
  yPosition = addText(`Hiring Manager`, margin, yPosition, pageWidth - 2 * margin, 10)
  yPosition = addText(companyName, margin, yPosition + 3, pageWidth - 2 * margin, 10)
  yPosition += 15

  // Subject
  yPosition = addText(`Re: Application for ${jobTitle} Position`, margin, yPosition, pageWidth - 2 * margin, 12, 'bold')
  yPosition += 15

  // Body
  const paragraphs = [
    'Dear Hiring Manager,',
    
    `I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. As a BSc (Hons) Computer Science graduate with extensive experience in full-stack development and ICT support, I am excited about the opportunity to contribute to your team's success.`,
    
    'My technical expertise spans modern web technologies including React, PHP, MySQL, and cloud platforms. I have successfully delivered secure, scalable applications while maintaining strong focus on user experience and performance optimization. My experience in ICT support has given me valuable insights into system administration, security protocols, and end-user needs.',
    
    'What sets me apart is my combination of technical skills and practical problem-solving experience. I have worked on projects ranging from e-commerce platforms to enterprise applications, always ensuring robust security measures and efficient database design. My background in service desk coordination has taught me the importance of clear communication and systematic approach to technical challenges.',
    
    `I am particularly drawn to ${companyName} because of your commitment to innovation and excellence. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's objectives.`,
    
    'Thank you for considering my application. I look forward to hearing from you.',
    
    'Sincerely,',
    'Mphatso Gama'
  ]

  paragraphs.forEach(paragraph => {
    if (paragraph === 'Dear Hiring Manager,' || paragraph === 'Sincerely,' || paragraph === 'Mphatso Gama') {
      yPosition = addText(paragraph, margin, yPosition, pageWidth - 2 * margin, 10, paragraph === 'Mphatso Gama' ? 'bold' : 'normal')
    } else {
      yPosition = addText(paragraph, margin, yPosition, pageWidth - 2 * margin, 10)
    }
    yPosition += paragraph === 'Sincerely,' ? 15 : 8
  })

  doc.save(`Cover_Letter_${jobTitle.replace(/\s+/g, '_')}_${companyName.replace(/\s+/g, '_')}.pdf`)
}