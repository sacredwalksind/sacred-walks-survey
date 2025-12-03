'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Star } from 'lucide-react';

export default function SurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    ageGroup: '',
    hearAbout: '',
    planningMethod: '',
    travelStyle: '',
    duration: '',
    overallRating: 0,
    mainChallenges: '',
    surprises: '',
    missingInfo: '',
    bestExperience: '',
    worstExperience: '',
    wouldPayForService: '',
    priceWilling: '',
    importantServices: [] as string[],
    recommendations: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev.importantServices, value]
          : prev.importantServices.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRating = (rating: number) => {
    setFormData(prev => ({ ...prev, overallRating: rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.overallRating === 0) {
      alert('Please rate your overall Varanasi experience');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          nationality: '',
          ageGroup: '',
          hearAbout: '',
          planningMethod: '',
          travelStyle: '',
          duration: '',
          overallRating: 0,
          mainChallenges: '',
          surprises: '',
          missingInfo: '',
          bestExperience: '',
          worstExperience: '',
          wouldPayForService: '',
          priceWilling: '',
          importantServices: [],
          recommendations: '',
          email: ''
        });
      }, 3000);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your feedback will help us create better travel experiences in Varanasi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="border-l-4 border-orange-500 pl-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Varanasi Travel Experience Survey</h1>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">
              Hi there! 👋 We are <span className="font-semibold text-orange-700">Sacred Walks Travel</span>, helping visitors explore Varanasi smoothly through customized itineraries and authentic local experiences. Your feedback will help us improve travel support for foreigners in the city. This survey takes less than 3 minutes. Thank you! 😊
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Contact Sacred Walks Travel</p>
            <div className="flex flex-col space-y-1 text-sm text-gray-600">
              <a href="https://instagram.com/sacredwalkstravel" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                📸 @sacredwalkstravel
              </a>
              <a href="mailto:sacredwalksind@gmail.com" className="hover:text-orange-500 transition-colors">
                ✉️ sacredwalksind@gmail.com
              </a>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+917999841138" className="hover:text-orange-500 transition-colors">
                  📱 +91 7999841138 (Call/WhatsApp)
                </a>
                <a href="tel:+918798551791" className="hover:text-orange-500 transition-colors">
                  📱 +91 8798551791
                </a>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">About You</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality / Country *
              </label>
              <input
                type="text"
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., USA, Germany, Australia"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Group *
              </label>
              <select
                name="ageGroup"
                required
                value={formData.ageGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select age group</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-50">36-50</option>
                <option value="51-65">51-65</option>
                <option value="65+">65+</option>
              </select>
            </div>
          </div>

          {/* Planning & Discovery */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Planning Your Trip</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you first hear about Varanasi? *
              </label>
              <select
                name="hearAbout"
                required
                value={formData.hearAbout}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                <option value="friends">Friends/Family Recommendation</option>
                <option value="social-media">Social Media (Instagram, Facebook, etc.)</option>
                <option value="travel-blog">Travel Blogs/Websites</option>
                <option value="guidebook">Travel Guidebook</option>
                <option value="documentary">Documentary/Film</option>
                <option value="tour-company">Tour Company</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you plan your itinerary? *
              </label>
              <select
                name="planningMethod"
                required
                value={formData.planningMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                <option value="diy">Completely DIY (researched myself)</option>
                <option value="travel-agency">Through a travel agency</option>
                <option value="tour-package">Bought a tour package</option>
                <option value="local-help">Got help from locals/friends</option>
                <option value="mix">Mix of the above</option>
                <option value="spontaneous">Spontaneous (no planning)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travel Style *
              </label>
              <select
                name="travelStyle"
                required
                value={formData.travelStyle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select style</option>
                <option value="budget">Budget Backpacker</option>
                <option value="mid-range">Mid-range Traveler</option>
                <option value="luxury">Luxury Traveler</option>
                <option value="spiritual">Spiritual Seeker</option>
                <option value="cultural">Cultural Explorer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration of Stay in Varanasi *
              </label>
              <select
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                <option value="1-2">1-2 days</option>
                <option value="3-4">3-4 days</option>
                <option value="5-7">5-7 days</option>
                <option value="week+">More than a week</option>
              </select>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="space-y-4 bg-amber-50 p-6 rounded-lg border-2 border-orange-200">
            <h2 className="text-xl font-semibold text-gray-700 border-b border-orange-300 pb-2">Rate Your Experience</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall, how would you rate your Varanasi experience? *
              </label>
              <div className="flex items-center gap-2 justify-center mb-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRating(rating)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={48}
                      className={`${
                        formData.overallRating >= rating
                          ? 'fill-yellow-400 stroke-yellow-500'
                          : 'fill-gray-200 stroke-gray-300'
                      } transition-all`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 mb-2 px-2">
                <span>😞 Poor</span>
                <span>😊 Excellent</span>
              </div>
              {formData.overallRating > 0 && (
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-600 bg-white py-2 px-4 rounded-lg inline-block">
                    You rated: {formData.overallRating}/5 ⭐
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Experience & Challenges */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Your Experience</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What were your biggest challenges or problems in Varanasi? *
              </label>
              <textarea
                name="mainChallenges"
                required
                value={formData.mainChallenges}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., navigation, language barrier, scams, finding good food, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What surprised you most about Varanasi?
              </label>
              <textarea
                name="surprises"
                value={formData.surprises}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Both positive and negative surprises"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What information did you wish you had BEFORE arriving? *
              </label>
              <textarea
                name="missingInfo"
                required
                value={formData.missingInfo}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., dress codes, best times to visit ghats, how to avoid touts, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Best experience in Varanasi *
              </label>
              <textarea
                name="bestExperience"
                required
                value={formData.bestExperience}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Worst experience or disappointment
              </label>
              <textarea
                name="worstExperience"
                value={formData.worstExperience}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Service Feedback */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">About Travel Planning Services</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Would you have paid for a customized itinerary planning service? *
              </label>
              <select
                name="wouldPayForService"
                required
                value={formData.wouldPayForService}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                <option value="definitely">Definitely yes</option>
                <option value="probably">Probably yes</option>
                <option value="maybe">Maybe</option>
                <option value="probably-not">Probably not</option>
                <option value="no">Definitely not</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How much would you be willing to pay for a complete customized package?
              </label>
              <select
                name="priceWilling"
                value={formData.priceWilling}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select range</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50-$100</option>
                <option value="100-200">$100-$200</option>
                <option value="200-500">$200-$500</option>
                <option value="500+">$500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which services would be most important to you? (Select all that apply)
              </label>
              <div className="space-y-2">
                {[
                  'Customized daily itinerary',
                  'Hotel/accommodation booking',
                  'Local guide services',
                  'Restaurant recommendations',
                  'Transportation arrangements',
                  'Spiritual experience guidance',
                  'Photography spots and tips',
                  '24/7 support during stay',
                  'Pre-arrival cultural briefing',
                  'Shopping and bargaining help'
                ].map(service => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      name="importantServices"
                      value={service}
                      checked={formData.importantServices.includes(service)}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Feedback */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Final Thoughts</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Any other recommendations or suggestions?
              </label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="What would make the Varanasi experience better for foreign travelers?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional - if you'd like updates on our service)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            {loading ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Survey</span>
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6 mb-6">
          Your responses are valuable and will remain confidential.
        </p>
        
        <div className="mt-8 pt-6 border-t-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">🌼 Thank You!</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Thank you for helping improve the Varanasi experience! We hope your journey here is beautiful and meaningful.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h4 className="text-xl font-bold text-orange-700 mb-3">
              🌿 Traveling to Varanasi? We've Got You Covered.
            </h4>
            <p className="text-gray-700 mb-4">
              If you're visiting Varanasi and want help planning your trip, we offer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-2">✨</span>
                <span className="text-gray-700">Budget-friendly itineraries</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-2">✨</span>
                <span className="text-gray-700">Custom travel planning</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-2">✨</span>
                <span className="text-gray-700">Local guidance</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-2">✨</span>
                <span className="text-gray-700">Trusted booking services</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic border-t pt-4">
              Whether you're a solo backpacker, spiritual seeker, or culture explorer — we help you travel smarter, safer, and more meaningfully.
            </p>
          </div>

          <div className="text-center bg-orange-600 text-white rounded-lg p-5">
            <p className="font-bold text-lg mb-4">📞 Get in Touch</p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://instagram.com/sacredwalkstravel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                📸 @sacredwalkstravel
              </a>
              <a 
                href="mailto:sacredwalksind@gmail.com" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ✉️ sacredwalksind@gmail.com
              </a>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="https://wa.me/917999841138" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  💬 WhatsApp: +91 7999841138
                </a>
                <a 
                  href="tel:+917999841138" 
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  📞 Call: +91 7999841138
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}