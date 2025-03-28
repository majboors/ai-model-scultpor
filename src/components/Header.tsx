
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Settings, Share2, CreditCard, LogIn, LogOut, User, Sparkles, Badge, Menu, X } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Badge as UIBadge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  onPricingClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPricingClick }) => {
  const { user, isSubscribed, signOut } = useAuth();
  const needsSubscription = !isSubscribed && user;
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex items-center justify-between border-b border-border animate-fade-in relative">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-md">
          <div className="h-3 w-3 sm:h-4 sm:w-4 bg-white rounded-sm transform rotate-45"></div>
        </div>
        <h1 className="text-xl sm:text-2xl font-medium">
          <span className="text-gradient">AI</span> Model Creator
        </h1>
        {isSubscribed && !isMobile && (
          <UIBadge variant="default" className="bg-gradient-to-r from-primary to-blue-400 px-2 py-1 ml-2 hidden sm:flex">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium
          </UIBadge>
        )}
      </div>

      {isMobile ? (
        <div className="flex items-center">
          {user && isSubscribed && (
            <UIBadge variant="default" className="bg-gradient-to-r from-primary to-blue-400 px-2 py-1 mr-2 flex sm:hidden">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </UIBadge>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-button p-2" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          {mobileMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-50 py-2 px-3 border border-border animate-fade-in">
              {user ? (
                <>
                  <Button 
                    variant={needsSubscription ? "default" : "outline"}
                    size="sm" 
                    className={`w-full justify-start mb-2 ${needsSubscription ? "bg-primary text-white hover:bg-primary/90" : "glass-button"}`}
                    onClick={onPricingClick}
                  >
                    {isSubscribed ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Premium Active
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pricing
                        {needsSubscription && <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">1/1</span>}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" className="glass-button w-full justify-start mb-2">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="glass-button w-full justify-start mb-2">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Link to="/account" className="block mb-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full justify-start ${isSubscribed ? "border-primary/50 bg-primary/10" : "glass-button"}`}
                    >
                      {isSubscribed ? (
                        <>
                          <Badge className="h-4 w-4 mr-2 text-primary" />
                          Account
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4 mr-2" />
                          Account
                        </>
                      )}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="glass-button w-full justify-start" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="block">
                  <Button variant="outline" size="sm" className="glass-button w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <Button 
                variant={needsSubscription ? "default" : "outline"}
                size="sm" 
                className={needsSubscription ? "bg-primary text-white hover:bg-primary/90" : "glass-button"}
                onClick={onPricingClick}
              >
                {isSubscribed ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-1" />
                    Premium Active
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pricing
                    {needsSubscription && <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">1/1</span>}
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="glass-button">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="glass-button">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link to="/account">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`rounded-full p-2 ${isSubscribed ? "border-primary/50 bg-primary/10" : "glass-button"}`}
                >
                  {isSubscribed ? (
                    <Badge className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="glass-button" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="glass-button">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
