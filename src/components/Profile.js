// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchZarbyteProfileData } from '../api/zarbyteApi.js';
import Loading from './Loading.js';
import Error from './Error.js';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSnapchat,
  FaYoutube,
  FaDownload,
  FaQrcode,
  FaCalendarAlt,
  FaGlobe,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import DOMPurify from 'dompurify';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Profile = () => {
  const { uuid } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for modals
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchZarbyteProfileData(uuid);
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [uuid]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  // Apply custom colors if available
  const styles = {
    backgroundColor: profile.color_background || '#ffffff',
    color: profile.color_text || '#000000',
  };

  // Function to handle vCard download
  const handleVCardDownload = () => {
    // Assuming profile.vcardUrl is the URL to the vCard file
    if (profile.vcardUrl) {
      window.open(profile.vcardUrl, '_blank');
    } else {
      // Generate vCard data if vcardUrl is not provided
      const vcardData = `BEGIN:VCARD
VERSION:3.0
N:${profile.name}
EMAIL:${profile.email || ''}
TEL:${profile.phone || ''}
TITLE:${profile.title || ''}
ORG:${profile.company || ''}
URL:${profile.website || ''}
END:VCARD`;
      const blob = new Blob([vcardData], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${profile.name || 'contact'}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Function to toggle QR code modal
  const toggleQRModal = () => {
    setIsQRModalOpen(!isQRModalOpen);
  };

  // Function to toggle Appointment modal
  const toggleAppointmentModal = () => {
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  };

  // URL to this profile page
  const profileUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
        {/* Cover Photo */}
        {profile.photo_cover && (
          <div className="relative">
            <img
              src={profile.photo_cover}
              alt="Cover"
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x200';
              }}
            />
            {/* Profile Picture */}
            {profile.photo_avatar && (
              <img
                src={profile.photo_avatar}
                alt={`${profile.name}'s profile`}
                crossOrigin="anonymous"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 -bottom-16"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            )}
          </div>
        )}

        <div className="pt-20 pb-8 px-6">
          {/* Name and Job Title */}
          <h1
            className="text-3xl font-bold text-center mb-1"
            style={{ color: profile.color_headings || styles.color }}
          >
            {profile.name}
          </h1>
          {(profile.title || profile.company) && (
            <p
              className="text-xl text-center mb-4 text-gray-600"
              style={{ color: styles.color }}
            >
              {profile.title} {profile.company && `at ${profile.company}`}
            </p>
          )}

          {/* Contact Information */}
          <div className="text-center mb-6">
            {profile.email && (
              <p className="text-lg mb-2 flex items-center justify-center">
                <a href={`mailto:${profile.email}`} className="text-blue-500">
                  {profile.email}
                </a>
              </p>
            )}
            {profile.phone && (
              <p className="text-lg mb-2 flex items-center justify-center">
                <a href={`tel:${profile.phone}`} className="text-blue-500">
                  {profile.phone}
                </a>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {/* Save Button */}
            <button
              onClick={handleVCardDownload}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            >
              <FaDownload className="mr-2" />
              Save Contact
            </button>
            {/* QR Code Button */}
            <button
              onClick={toggleQRModal}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
            >
              <FaQrcode className="mr-2" />
              QR Code
            </button>
            {/* Book Appointment Button */}
            {profile.system_appointments && (
              <button
                className="flex items-center bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 transition"
                onClick={toggleAppointmentModal}
              >
                <FaCalendarAlt className="mr-2" />
                Book Appointment
              </button>
            )}
            {/* Visit My Website Button */}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition"
              >
                <FaGlobe className="mr-2" />
                Visit My Website
              </a>
            )}
          </div>

          {/* About Me */}
          {profile.description && (
            <div className="mb-6">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: profile.color_headings || styles.color }}
              >
                About Me
              </h2>
              <p
                className="text-lg whitespace-pre-line"
                style={{ color: styles.color }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(profile.description),
                }}
              ></p>
            </div>
          )}

          {/* Social Links */}
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: profile.color_headings || styles.color }}
            >
              Connect with Me
            </h2>
            <div className="flex justify-center space-x-4">
              {profile.facebook && (
                <a
                  href={`https://facebook.com/${profile.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-3xl hover:text-blue-700 transition"
                >
                  <FaFacebook />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-3xl hover:text-blue-500 transition"
                >
                  <FaTwitter />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-3xl hover:text-blue-800 transition"
                >
                  <FaLinkedin />
                </a>
              )}
              {profile.instagram && (
                <a
                  href={`https://instagram.com/${profile.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-3xl hover:text-pink-600 transition"
                >
                  <FaInstagram />
                </a>
              )}
              {profile.snapchat && (
                <a
                  href={`https://www.snapchat.com/add/${profile.snapchat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 text-3xl hover:text-yellow-600 transition"
                >
                  <FaSnapchat />
                </a>
              )}
              {profile.tiktok && (
                <a
                  href={`https://www.tiktok.com/@${profile.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-3xl hover:text-gray-800 transition"
                >
                  <SiTiktok />
                </a>
              )}
              {profile.youtube && (
                <a
                  href={`https://www.youtube.com/${profile.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 text-3xl hover:text-red-700 transition"
                >
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>

          {/* Services / Buttons */}
          {profile.buttons && profile.buttons.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: profile.color_headings || styles.color }}
              >
                My Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white text-center py-2 px-4 rounded hover:opacity-90 transition"
                    style={{
                      backgroundColor: profile.color_primary || '#0d6efd',
                    }}
                  >
                    {button.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          {profile.address && (
            <div className="mb-6">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: profile.color_headings || styles.color }}
              >
                Address
              </h2>
              <p className="text-lg" style={{ color: styles.color }}>
                {profile.address}
              </p>
              {/* Map */}
              <div className="mt-4">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    profile.address
                  )}&output=embed`}
                  width="100%"
                  height="300"
                  allowFullScreen=""
                  loading="lazy"
                  title="map"
                ></iframe>
              </div>
            </div>
          )}

          {/* Slides (Photo Gallery) */}
          {profile.slides && profile.slides.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: profile.color_headings || styles.color }}
              >
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          {profile.branding && (
            <div className="text-center mb-4">
              <Link to="/" className="text-sm" style={{ color: styles.color, textDecoration: 'none' }}>
                Powered by Zarbyte
              </Link>
            </div>
          )}

          {/* Last Updated Date */}
          {profile.updated_at && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">
                Profile last updated on{' '}
                {new Date(profile.updated_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={isQRModalOpen}
        onRequestClose={toggleQRModal}
        contentLabel="QR Code"
        className="flex items-center justify-center h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative z-50">
          <h2 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h2>
          <div className="flex justify-center">
            <QRCodeCanvas value={profileUrl} size={200} />
          </div>
          <button
            onClick={toggleQRModal}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Appointment Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onRequestClose={toggleAppointmentModal}
        contentLabel="Book Appointment"
        className="flex items-center justify-center h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative z-50">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Book an Appointment
          </h2>
          {/* Implement appointment booking form here */}
          <p className="mb-4 text-center">
            Appointment booking functionality goes here.
          </p>
          <button
            onClick={toggleAppointmentModal}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;